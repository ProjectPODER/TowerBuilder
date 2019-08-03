/*
_-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*
VARIABLE DEFINITIONS FOR GRAPH
*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-_
*/

function correctJSON(s) {
    const corrected = '[' + s.replace(/=>/g, ':').replace(/}{/g, '},{') + ']'
    const aconfig = JSON.parse(corrected)

    function arrayToObject(a) {
        return a.reduce((a, c) => {
            if (typeof c === 'object') {
                Object.entries(c).map(([k, v]) => {
                    if (v instanceof Array) {
                        c[k] = arrayToObject(v)
                    }
                })
            }

            return Object.assign({}, a, c)
        }, {})
    }

    return arrayToObject(aconfig)
}

const config = correctJSON(window.graphConfig)

const nodeSizes = {
    min: 10,
    max: 100
}

const defaultNodeColours = {
    default: '#1ee6d3',
    contract: '#1ee6d3',
    contractTypes: '#3abdc3',
    contractByType: '#438a9c',
    organization: '#3c5a6f',
    shareholderPerson: '#EB639A',
    shareholderCorp: '#363E4E',
}

const defaultLinkColours = {
    default: '#706F74',
    contractsTypes: '#706F74',
    toCenter: '#706F74',
    toContractType: '#706F74',
    toOrganization: '#706F74',
}

const colours = {
    nodes: defaultNodeColours,
    links: defaultLinkColours
}

const projectTitle = config.title;
if (config.sizes) {
    nodeSizes = Object.assign({}, nodeSizes, config.sizes)
}

if (config.colours) {
    if (config.colours.nodes) {
        Object.assign(colours.nodes, config.colours.nodes)
    }

    if (config.colours.links) {
        Object.assign(colours.links, config.colours.links)
    }
}

// FIXME: detectar si es movil, todo lo demas deberia funcionar bien...
const isMobile = false;
const isDesktop = true;

let nodes = [];
let links = [];

const fs = -350;
const ls = 0.6;
const ld = 70;

const mn = 0;
const mx = 1000;
const cr = 20;

let node;
let link;
let label;
let icon;
let offset = 0;
let graph;
let zoomLevel;
let resG;
let svg;
let zoom;
const AppData = {
  persons: [],
  organizations: [],
  contracts: [],
  investigations: [],
  actualSlide: 1
};
let tooltipHTML;
const globalTimers = [];
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame;




/*
_-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*
OCDS + OWNERS TRANSFORMATION
*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-_
*/

function buildGraphData(contracts_json) {
    var releases = contracts_json.releases;
    var contracts = [];
    var contracts_index = [];
    var orgs = [];
    var orgs_index = [];
    var shareboarders = [];
    var shareboarders_index = [];

    releases.map( (release) => {
        if(release.hasOwnProperty('contracts')) {
            var contractSuppliers = findSupplierParties(release);
            var contractDates = findContractDates(release);
            var contract = {
                        "_id": release.id ? release.id : release.ocid,
                        "ocid": release.ocid,
                        "title": release.tender.title,
                        "type": release.tender.mainProcurementCategory ? release.tender.mainProcurementCategory : release.tender.procurementMethodDetails,
                        "procedure_type": release.tender.procurementMethodDetails,
                        "amount": release.contracts[0].value.amount,
                        "currency": release.contracts[0].value.currency,
                        "suppliers": contractSuppliers,
                        "start_date": contractDates['start'],
                        "end_date": contractDates['end']
                    };
            contracts.push(contract);
            contracts_index.push(contract.ocid);

            contract.suppliers.map( (supplier) => {
                var orgIndex = findOrg(supplier.id, orgs_index);
                if(orgIndex > 0) {
                    orgs[orgIndex].contracts_count += 1;
                    orgs[orgIndex].contracts_amount += contract.amount;
                    orgs[orgIndex].contracts.push(contractOrgObject(contract));
                }
                else {
                    var supplierObj = orgObject(supplier);

                    supplierObj.contracts_count += 1;
                    supplierObj.contracts_amount += contract.amount;
                    supplierObj.contracts.push(contractOrgObject(contract));

                    orgs.push(supplierObj);
                    orgs_index.push(supplier.id);
                }
            } );
        }
    } );

    // Aquí se parsea el CSV con los datos de parents y shareholders y board members
    $.get('/assets/data/owners.csv', function(csv_data) {
        var lines = Papa.parse(csv_data);
        var owners = lines.data;
        owners.shift(); // Quitar los headers del csv

        owners.map( (owner) => {
            if(owner[0].trim() == '') { return; } // Evitar las filas vacías

            var simpleOrg = orgName2Id(owner[2]); // Con quien está relacionada la entidad (versión simple)
            var simpleEntity = orgName2Id(owner[0]); // La entidad que estamos relacionando (versión simmple)
            var orgOriginal = findOrg( simpleOrg, orgs_index );
            if(orgOriginal >= 0) {
                switch(owner[3]) {
                    case 'parent':
                        orgs[orgOriginal].parents_ids.push(simpleEntity);
                        var tempParent = orgObject({ id: simpleEntity, simple: owner[0] });
                        tempParent.contracts_count += orgs[orgOriginal].contracts_count;
                        tempParent.contracts_count += orgs[orgOriginal].contracts_amount;
                        orgs.push(tempParent);
                        break;
                    case 'shareholder':
                        orgs[orgOriginal].shareholders_ids.push(simpleEntity);
                        // ENCONTRAR AL SHAREHOLDER!!!
                        var tempShareholder = {
                            "_id": simpleEntity,
                            "type": (owner[1] == 'persona')? 'person' : 'organization',
                            "name": owner[0],
                            "simple": simpleEntity,
                            "contracts_count": orgs[orgOriginal].contracts_count,
                            "contracts_amount": orgs[orgOriginal].contracts_amount
                        }
                        shareboarders.push(tempShareholder);
                        shareboarders_index.push(simpleEntity);
                        break;
                    case 'boardmember':
                        orgs[orgOriginal].board_ids.push(simpleEntity);
                        // ENCONTRAR AL BOARDMEMBER!!!
                        var tempBoardmember = {
                            "_id": simpleEntity,
                            "type": "person",
                            "name": owner[0],
                            "simple": simpleEntity,
                            "contracts_count": orgs[orgOriginal].contracts_count,
                            "contracts_amount": orgs[orgOriginal].contracts_amount,
                            "role": owner[4]
                        }
                        shareboarders.push(tempBoardmember);
                        shareboarders_index.push(simpleEntity);
                        break;
                }
            }
        } );

        const contractsJson = contractsJSON(contracts);
        // console.log(contractsJson);
        const organizationsJson = orgsJSON(orgs, orgs_index, shareboarders, shareboarders_index);
        // console.log(organizationsJson);

        // Cargar la data al gráfico
        initGraph({'contracts': contractsJson, 'organizations': organizationsJson, 'investigations': null}) // FIXME: no hay investigations.json
    })
}

function orgName2Id(name) {
    return name.normalize('NFD')
                .replace(/[,.]/g, '') // remove commas and periods
                .toLowerCase();
}

function findOrg(id, org_index) {
    return org_index.indexOf(id);
}

function findMember(id, member_index) {
    return member_index.indexOf(id);
}

function findContractDates(release) {
    var dates = [];
    if(release.contracts[0].hasOwnProperty('period')) {
        dates['start'] = release.contracts[0].period.startDate;
        dates['end'] = release.contracts[0].period.endDate;
    }
    else if(release.awards[0].hasOwnProperty('contractPeriod')) {
        dates['start'] = release.awards[0].contractPeriod.startDate;
        dates['end'] = release.awards[0].contractPeriod.endDate;
    }
    return dates;
}

function findSupplierParties(release)
{
    var suppliers = [];
    if(release.parties) {
        release.parties.map( (party) => {
            if(party.hasOwnProperty('role')) {
                if(party.role == 'supplier') {
                    suppliers.push({
                        "_id": party.id? party.id : party.name,
                        "id": party.id? party.id : party.name,
                        "simple": party.name
                    });
                }
            }
            else if(party.hasOwnProperty('roles')) {
                if(party.roles.length > 0 && party.roles.indexOf('supplier') >= 0) {
                    suppliers.push({
                        "_id": party.id? party.id : party.name,
                        "id": party.id? party.id : party.name,
                        "simple": party.name
                    });
                }
            }
        } );
    }

    if(suppliers.length == 0) {
        if(release.hasOwnProperty('awards') && release.awards.length > 0) {
            suppliers.push({
                "_id": release.awards[0].suppliers[0].id? release.awards[0].suppliers[0].id : release.awards[0].suppliers[0].name,
                "id": release.awards[0].suppliers[0].id? release.awards[0].suppliers[0].id : release.awards[0].suppliers[0].name,
                "simple": release.awards[0].suppliers[0].name
            });
        }
    }

    return suppliers;
}

function orgObject(supplier) {
    let supplierObj = {
        "_id": supplier.id,
        "id": supplier.id,
        "name": supplier.simple,
        "simple": supplier.simple,
        "contracts_count": 0,
        "contracts_amount": 0,
        "parents_ids": [],
        "parents": [],
        "contracts": [],
        "shareholders_ids": [],
        "shareholders": [],
        "board_ids": [],
        "board": []
    }

    return supplierObj;
}

function contractOrgObject(contract) {
    var contractOrgObj = {
        "_id": contract._id,
        "ocid": contract.ocid,
        "title": contract.title,
        "type": contract.type,
        "procedure_type": contract.procedure_type,
        "amount": contract.amount,
        "currency": contract.currency,
        "start_date": contract.start_date,
        "end_date": contract.end_date
    }

    return contractOrgObj;
}

function contractsJSON(contract_list) {
    var contractsObj = {
        "status": "success",
        "datetime": "",
        "count": contract_list.length,
        "data": []
    }

    contract_list.map( (contract) => {
        contractsObj.data.push(contract);
    } );

    return contractsObj;
}

function orgsJSON(org_list, org_index, shareboarders_list, shareboarders_index) {
    var orgsObj = {
        "status": "success",
        "datetime": "",
        "count": org_list.length,
        "data": []
    }

    org_list.map( (org) => {
        var tempOrgObj = expandOrg(org, org_list, org_index, shareboarders_list, shareboarders_index);
        orgsObj.data.push(tempOrgObj);
    } );

    return orgsObj;
}

function expandOrg(org, org_list, org_index, shareboarders_list, shareboarders_index) {
    var tempOrgObj = clonedeep(org);

    // Si tiene un parent, lo expandimos
    if(tempOrgObj.parents_ids.length > 0 && tempOrgObj.parents.length == 0) {
        tempOrgObj.parents_ids.map( (id) => {
            var tempParent = org_list[findOrg(id, org_index)];
            var clonedParent = clonedeep(tempParent);

            clonedParent = expandOrg(clonedParent, org_list, org_index, shareboarders_list, shareboarders_index);

            tempOrgObj.parents.push(clonedParent);
        } );
    }

    // Si tiene shareholders, los expandimos
    if(tempOrgObj.shareholders_ids.length > 0) {
        tempOrgObj.shareholders_ids.map( (id) => {
            var tempShareholder = shareboarders_list[findMember(id, shareboarders_index)];
            var clonedShareholder = clonedeep(tempShareholder);
            tempOrgObj.shareholders.push(clonedShareholder);
        } );
    }
    delete tempOrgObj.shareholders_ids;

    // Si tiene boardmembers, los expandimos
    if(tempOrgObj.board_ids.length > 0) {
        tempOrgObj.board_ids.map( (id) => {
            var tempBoard = shareboarders_list[findMember(id, shareboarders_index)];
            var clonedBoard = clonedeep(tempBoard);
            tempOrgObj.board.push(clonedBoard);
        } );
    }
    delete tempOrgObj.board_ids;

    return tempOrgObj;
}

function clonedeep(obj) {
    return JSON.parse(JSON.stringify(obj))
}




/*
_-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*
FUNCTIONS RELATED TO THE GRAPH
*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-_
*/

/* FIXME: no se qué hace esta función...
function getOrganizations(params) {
  const timestamp = (new Date()).getTime();
  let suppliers = [];
  for (let c = 0; c < params.contracts.length; c++) {
    suppliers = [
      ...suppliers,
      ...(params.contracts[c].suppliers || [])
    ]
  }

  let uniqueSuppliers = {};

  for (let s = 0; s < suppliers.length; s++) {
    let supplierName = suppliers[s].simple;
    uniqueSuppliers[supplierName] != undefined
      ? uniqueSuppliers[supplierName] == uniqueSuppliers[supplierName] + 1
      : uniqueSuppliers[supplierName] = 1;
  }

  const organizationFilter = new Filter({property: 'suppliers'});
  const contractorsNamesSet = new MathSet(params.contracts);
  const organizationsByNames = Object.keys(uniqueSuppliers);

    cb(null, {
      ...params,
      organizations: organizationsJson.data
    });
}
*/

function initGraph(data) {
  AppData.organizations = data.organizations.data;
  AppData.contracts = data.contracts.data;
  AppData.investigations = data.investigations;
  AppData.texts = {};

  const contractsAmount = getContractsAmount(AppData.contracts);
  const contractsByTypes = getContractsByTypes(AppData.contracts);
  const organizations = AppData.organizations;
  const investigations = AppData.investigations;
  const relatedFiguresStack = {};
  const slidesObjects = [
    null, {
      nodes: [],
      links: []
    }, {
      nodes: [],
      links: []
    }, {
      nodes: [],
      links: []
    }, {
      nodes: [],
      links: []
    }, {
      nodes: [],
      links: []
    }, {
      nodes: [],
      links: []
    }
  ];

  var contractsByOrganizations = []
  AppData.contracts.forEach(function(contract) {
    contract.suppliers.forEach(function(supplier) {
      if (contractsByOrganizations[supplier.simple] === undefined)
        contractsByOrganizations[supplier.simple] = [];
      contractsByOrganizations[supplier.simple].push({key: supplier.simple, value: contract})
    })
  })

  const organizationsByNames = Object.keys(contractsByOrganizations).map(key => contractsByOrganizations[key]);
  window.algo = contractsByOrganizations;
  AppData.texts.contracts_amount_text = numberWithCommas((Math.round(contractsAmount / 1000000)).toLocaleString());
  AppData.texts.contracts_type_text = Object.keys(contractsByTypes).length;
  AppData.texts.contracts_total_text = objectToArray(contractsByTypes).reduce(function(total, actual) {
    return total + Object.keys(actual.contracts).length
  }, 0);
  AppData.texts.direct_adjudication_text = AppData.contracts.filter(contract => {
    return contract.procedure_type == "Adjudicación Directa Federal"
  }).length;
  AppData.texts.direct_adjudication_percentage_text = (Math.ceil(AppData.contracts.filter(contract => {
    return contract.procedure_type == "Adjudicación Directa Federal"
  }).reduce((before, actual) => {
    return before + actual.amount
  }, 0)) / contractsAmount * 100).toFixed(2);
  AppData.texts.suppliers_count_text = Object.keys(organizationsByNames).length;
  AppData.texts.big_amount_contracts_text = (AppData.contracts.filter(contract => {
    return contract.amount >= 1000000000
  }).length);
  AppData.texts.big_amount_percentage_text = (Math.ceil(AppData.contracts.filter(contract => {
    return contract.amount >= 1000000000
  }).reduce((before, actual) => {
    return before + actual.amount
  }, 0)) / contractsAmount * 100).toFixed(2);
  AppData.texts.big_amount_winners_text = Math.ceil(AppData.contracts.filter(contract => {
    return contract.amount >= 1000000000
  }).length);

  const node = {
    id: 'contracts',
    name: 'contracts',
    activeSize: contractsAmount / 500000, // FIXME: tiene que calcularse esto dinámicamente
    inactiveSize: 35,
    topParentNode: false,
    nodeForce: 10,
    type: 'all',
    group: 1,
    color: colours.nodes.contract,
    linksCount: 0,
    label: projectTitle,
    icon: null
  };
  slidesObjects[1].nodes.push(node);
  nodes.push(node);
  for (let i in contractsByTypes) {
    const contractByType = contractsByTypes[i];
    const node = {
      id: contractByType.name,
      name: contractByType.name,
      activeSize: Math.pow(contractByType.amount, 1 / 5) / 10,
      inactiveSize: 15,
      topParentNode: false,
      nodeForce: 10,
      type: 'contract_type',
      group: 2,
      color: colours.nodes.contractTypes,
      linksCount: 0,
      contractsCount: Object.keys(contractByType.contracts).length,
      contractsAmount: contractByType.amount,
      icon: null,
      label: contractByType.name
    };
    const link = {
      source: contractByType.name,
      target: 'contracts',
      type: 'contract_type',
      linkStrength: 2,
      linkDistance: 1,
      color: colours.links.contractTypes,
      dashed: false,
      opacity: 0.6
    };
    slidesObjects[2].nodes.push(node);
    slidesObjects[2].links.push(link);
    nodes.push(node);
    links.push(link);
    for (let j in contractByType.contracts) {
      const contract = contractByType.contracts[j];
      const node = {
        id: contract._id,
        name: contract.title,
        amount: contract.amount,
        activeSize: Math.log(contract.amount) / 2,
        inactiveSize: 30,
        topParentNode: false,
        nodeForce: 0.6,
        type: 'contract',
        group: 3,
        color: colours.nodes.contractByType,
        linksCount: 0,
        suppliersList: contract.suppliers.map(supplier => supplier.simple),
        icon: null
      };
      const linkToCenter = {
        source: contract._id,
        target: 'contracts',
        type: 'contract',
        hidden: true,
        linkStrength: 3,
        linkDistance: 2.5,
        color: colours.links.toCenter,
        dashed: false,
        opacity: 0
      };
      const linkToContractType = {
        source: contract._id,
        target: contractByType.name,
        type: 'contract',
        linkStrength: 3,
        linkDistance: 2.5,
        color: colours.links.toContractType,
        dashed: false,
        opacity: 0.6
      };
      slidesObjects[3].nodes.push(node);
      slidesObjects[3].links.push(linkToCenter);
      slidesObjects[3].links.push(linkToContractType);
      nodes.push(node);
      links.push(linkToCenter);
      links.push(linkToContractType);
    }
  }

  for (let k in organizations) {
    const organization = organizations[k];
    const node = {
      id: organization._id,
      name: organization.name,
      activeSize: organization.contracts_count * 2 + 10,
      inactiveSize: 10,
      nodeForce: 10,
      type: 'organization',
      group: 4,
      color: colours.nodes.organization,
      linksCount: 0,
      contractsCount: organization.contracts_count,
      contractsAmount: organization.contracts_amount,
      icon: null
    };
    for (let j in AppData.contracts) {
      const contract = AppData.contracts[j];

      if (contract.suppliers && contract.suppliers.filter(supplier => {
        return supplier.simple == organization.simple
      }).length > 0) {
        const link = {
          source: organization._id,
          target: contract._id,
          type: 'organization',
          linkStrength: 4,
          linkDistance: 1,
          color: colours.links.toOrganization,
          dashed: true,
          opacity: 1,
          name: organization.name
        };
        slidesObjects[4].links.push(link);
        links.push(link);
        node.linksCount++;
      }
    }

    const linkToCenter = {
      source: organization._id,
      target: 'contracts',
      type: 'organization',
      hidden: true,
      linkStrength: 4,
      linkDistance: 6,
      color: colours.links.toCenter,
      dashed: false,
      opacity: 0
    };
    slidesObjects[4].links.push(linkToCenter);
    links.push(linkToCenter);
    slidesObjects[4].nodes.push(node);
    nodes.push(node);
  }

  let allFiguresCount = 0;

  function linkParents(linkOrganization, organization) {
    const parents = organization.parents;
    const shareholders = organization.shareholders;
    const boards = organization.board;

    if (parents && parents.length > 0) {
      for (let p in parents) {
        const parent = parents[p];
        linkParents(organization, parent)
      }
    }

    if (organizationNotExists(organization._id)) {
      allFiguresCount++;
      const node = {
        id: organization._id,
        name: organization.name,
        activeSize: organization.contracts_count * 2 + 10,
        inactiveSize: 10,
        nodeForce: 10,
        type: 'related',
        group: 4,
        color: colours.nodes.organization,
        linksCount: 0,
        relationType: 'organization',
        icon: null,
        relationType2: 'Organization',
        contractsCount: organization.contracts_count
      };
      const linkToCenter = {
        source: organization._id,
        target: 'contracts',
        type: 'related',
        hidden: true,
        linkStrength: 3,
        linkDistance: 9,
        color: colours.links.toCenter,
        dashed: false,
        opacity: 0
      };
      slidesObjects[5].links.push(linkToCenter);
      slidesObjects[5].nodes.push(node);
      links.push(linkToCenter);
      nodes.push(node);
    }

    if (organizationNotExists(linkOrganization._id)) {
      allFiguresCount++;
      const node = {
        id: linkOrganization._id,
        name: linkOrganization.name,
        activeSize: linkOrganization.contracts_count * 2 + 10,
        inactiveSize: 10,
        nodeForce: 10,
        type: 'related',
        group: 4,
        color: colours.nodes.organization,
        linksCount: 0,
        relationType: 'organization',
        icon: null,
        relationType2: 'Organization',
        contractsCount: linkOrganization.contracts_count
      };
      const linkToCenter = {
        source: linkOrganization._id,
        target: 'contracts',
        type: 'related',
        hidden: true,
        linkStrength: 3,
        linkDistance: 9,
        color: colours.links.toOrganization,
        dashed: false,
        opacity: 0
      };
      slidesObjects[5].links.push(linkToCenter);
      slidesObjects[5].nodes.push(node);
      nodes.push(node);
      links.push(linkToCenter);
    }

    const link = {
      source: organization._id,
      target: linkOrganization._id,
      type: 'related',
      linkStrength: 3,
      linkDistance: 5,
      color: colours.links.toCenter,
      dashed: true,
      opacity: 1
    };
    slidesObjects[5].links.push(link);
    links.push(link);

    if (shareholders && shareholders.length > 0) {
      for (let s in shareholders) {
        allFiguresCount++;
        const shareholder = shareholders[s];
        const shareholderId = shareholder._id;
        const shareholderName = shareholder.name;
        const shareholderSimple = shareholder.simple;
        const shareholderType = shareholder.type;
        const shareholderContractsCount = shareholder.contracts_count || 0;
        const typeColor = shareholder.type == "person"
          ? colours.nodes.shareholderPerson
          : colours.nodes.shareholderCorp;
        if (relatedFiguresStack[shareholderId] == undefined) {
          relatedFiguresStack[shareholderId] = {
            count: 0,
            relationId: []
          };
          relatedFiguresStack[shareholderId].relationId.push(shareholderId + organization._id);
        } else {
          if (relatedFiguresStack[shareholderId].relationId.indexOf(shareholderId + organization._id) == -1) {
            relatedFiguresStack[shareholderId].count++;
            relatedFiguresStack[shareholderId].relationId.push(shareholderId + organization._id);
          }
        }

        switch (relatedFiguresStack[shareholderId].count) {
          case 0:
            {
              relatedFiguresStack[shareholderId].node = {
                id: shareholderId,
                name: shareholderName,
                simple: shareholderSimple,
                activeSize: shareholderContractsCount * 2 + 10,
                inactiveSize: 10,
                topParentNode: false,
                nodeForce: 10,
                type: 'related',
                group: 4,
                color: typeColor,
                linksCount: 0,
                relationType: shareholderType,
                icon: null,
                relationType2: 'Shareholder',
                contractsCount: shareholderContractsCount
              };
              // relatedFiguresStack[shareholderId].linkToCenter = { source: shareholderId, target: 'contracts', type: 'related', hidden: true, linkStrength: 3, linkDistance: 12, color: '#706F74', dashed: false, opacity: 0  };
              relatedFiguresStack[shareholderId].link = {
                source: shareholderId,
                target: organization._id,
                type: 'related',
                linkStrength: 2,
                linkDistance: 3,
                topParentNode: false,
                color: '#706F74',
                dashed: true,
                opacity: 1
              };

              break;
            }
          case 1:
            {
              const node = relatedFiguresStack[shareholderId].node;
              slidesObjects[5].nodes.push(node);
              nodes.push(node);
              // const linkToCenter = relatedFiguresStack[shareholderId].linkToCenter;
              // slidesObjects[5].links.push(linkToCenter);
              // links.push(linkToCenter);
              const link = relatedFiguresStack[shareholderId].link;
              slidesObjects[5].links.push(link);
              links.push(link);
              /* this continues to default, no brake statement */
            }
          default:
            {
              const link = {
                source: shareholderId,
                target: organization._id,
                type: 'related',
                linkStrength: 2,
                linkDistance: 3,
                topParentNode: false,
                color: colours.links.default,
                dashed: true,
                opacity: 1
              };
              slidesObjects[5].links.push(link);
              links.push(link);
            }
        }
      }
    }

    if (boards && boards.length > 0) {
      for (let s in boards) {
        allFiguresCount++;
        const board = boards[s];
        const boardId = board._id;
        const boardName = board.name;
        const boardSimple = board.simple;
        const boardContractsCount = board.contracts_count || 0;
        const typeColor = board.type == "person"
          ? colours.nodes.shareholderPerson
          : colours.nodes.shareholderCorp;
        const boardType = board.type;
        if (relatedFiguresStack[boardId] == undefined) {
          relatedFiguresStack[boardId] = {
            count: 0,
            relationId: []
          };
          relatedFiguresStack[boardId].relationId.push(boardId + organization._id);
        } else {
          if (relatedFiguresStack[boardId].relationId.indexOf(boardId + organization._id) == -1) {
            relatedFiguresStack[boardId].count++;
            relatedFiguresStack[boardId].relationId.push(boardId + organization._id);
          }
        }

        switch (relatedFiguresStack[boardId].count) {
          case 0:
            {
              relatedFiguresStack[boardId].node = {
                id: boardId,
                name: boardName,
                simple: boardSimple,
                activeSize: boardContractsCount * 2 + 10,
                inactiveSize: 10,
                topParentNode: false,
                nodeForce: 10,
                type: 'related',
                group: 4,
                color: typeColor,
                linksCount: 0,
                relationType: boardType,
                icon: null,
                relationType2: 'Board',
                contractsCount: boardContractsCount
              };
              // relatedFiguresStack[boardId].linkToCenter = { source: boardId, target: 'contracts', type: 'related', hidden: true, linkStrength: 3, linkDistance: 12, color: '#706F74', dashed: false, opacity: 0  };
              relatedFiguresStack[boardId].link = {
                source: boardId,
                target: organization._id,
                type: 'related',
                linkStrength: 2,
                linkDistance: 3,
                topParentNode: false,
                color: '#706F74',
                dashed: true,
                opacity: 1
              };

              break;
            }
          case 1:
            {
              const node = relatedFiguresStack[boardId].node;
              slidesObjects[5].nodes.push(node);
              nodes.push(node);
              // const linkToCenter = relatedFiguresStack[boardId].linkToCenter;
              // slidesObjects[5].links.push(linkToCenter);
              // links.push(linkToCenter);
              const link = relatedFiguresStack[boardId].link;
              slidesObjects[5].links.push(link);
              links.push(link);
              /* this continues to default, no brake statement */
            }
          default:
            {
              const link = {
                source: boardId,
                target: organization._id,
                type: 'related',
                linkStrength: 2,
                linkDistance: 3,
                topParentNode: false,
                color: '#706F74',
                dashed: true,
                opacity: 1
              };
              slidesObjects[5].links.push(link);
              links.push(link);
            }
        }
      }
    }

  }

  for (let k in organizations) {
    const organization = organizations[k];
    for (let p in organization.parents) {
      const parent = organization.parents[p];
      const linkOrganization = organization;
      linkParents(linkOrganization, parent);
    }
  }

  /* Investigations */
  for (let i in investigations) {
    const investigation = investigations[i];
    const investigationId = investigation.title.toLowerCase().replace(/\s/g, "-") + "-" + investigation.date;
    const suspectedOrganizations = organizations.filter(organization => investigation.suppliers.indexOf(organization.simple) > -1);
    const node = {
      id: investigationId,
      name: investigation.title,
      activeSize: 15,
      inactiveSize: 15,
      nodeForce: 10,
      type: 'investigation',
      group: 6,
      color: '#FFCF40',
      linksCount: 0,
      url: investigation.link,
      icon: "src/images/investigation_icon.svg"
    };
    nodes.push(node);
    slidesObjects[6].nodes.push(node);

    if (investigation.suppliers.indexOf("Grupo Aeroportuario De La Ciudad de México, S.A. de C.V.") > -1) {
      const link = {
        source: investigationId,
        target: 'contracts',
        type: 'investigation',
        linkStrength: 4,
        linkDistance: 13,
        color: '#706F74',
        dashed: false,
        opacity: 0.6
      };
      slidesObjects[6].links.push(link);
      links.push(link);
    } else {
      suspectedOrganizations.forEach(suspectedOrganization => {
        const link = {
          source: investigationId,
          target: suspectedOrganization._id,
          type: 'investigation',
          linkStrength: 2,
          linkDistance: 1,
          color: '#706F74',
          dashed: false,
          opacity: 0.6
        };
        slidesObjects[6].links.push(link);
        links.push(link);
      });
    }

    const shareholders = Object.keys(relatedFiguresStack).filter(key => relatedFiguresStack[key].count > 1)/* Get only elements with more than one relation */
      .map(key => relatedFiguresStack[key])/* Return objects instead of only ids */
      .filter(shareholder => investigation.suppliers.indexOf(shareholder.node.simple) > -1);/* Get only elements mentioned whithin the investigation */

    shareholders.forEach(shareholder => {
      const shareholderNode = shareholder.node;
      const link = {
        source: investigationId,
        target: shareholderNode.id,
        type: 'investigation',
        linkStrength: 2,
        linkDistance: 1,
        color: '#706F74',
        dashed: false,
        opacity: 0.6
      };
      slidesObjects[6].links.push(link);
      links.push(link);
    });

    const boards = Object.keys(relatedFiguresStack).filter(key => relatedFiguresStack[key].count > 1)/* Get only elements with more than one relation */
      .map(key => relatedFiguresStack[key])/* Return objects instead of only ids */
      .filter(board => investigation.suppliers.indexOf(board.node.simple) > -1);/* Get only elements mentioned whithin the investigation */

    boards.forEach(board => {
      const boardNode = board.node;
      const link = {
        source: investigationId,
        target: boardNode.id,
        type: 'investigation',
        linkStrength: 2,
        linkDistance: 1,
        color: '#706F74',
        dashed: false,
        opacity: 0.6
      };
      slidesObjects[6].links.push(link);
      links.push(link);
    });
  }

  function organizationNotExists(id) {
    const organizationWithId = organizations.filter(organization => {
      return organization._id == id
    });
    return organizationWithId.length == 0;
  }

  if (isMobile) {
    $('.graph-container').remove();
    $('.visualization-desktop').remove();

    document.addEventListener("update:visualization", updateVisualization);
    function updateVisualization(evt) {
      const nextIndex = evt.detail.nextIndex - 1;
      const graphsMappers = [
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6
      ];
      $('.mobile-graph-container').removeClass('active');
      $(`.graph-slide-${graphsMappers[nextIndex]}`).addClass('active');
      nextIndex % 2
        ? $('.mobile-graph-container').addClass('transparent')
        : $('.mobile-graph-container').removeClass('transparent');
      if (nextIndex == 11) {
        $('.visualization-down-arrow').addClass('hidden');
        $('.visualization-btns').addClass('hidden');
      }
    }
} else {
    $('.mobile-graph-container').remove();
    $('.visualization-mobile').remove();
    nodes = [
      ...slidesObjects[1].nodes,
      ...slidesObjects[2].nodes,
      ...slidesObjects[3].nodes,
      ...slidesObjects[4].nodes,
      ...slidesObjects[5].nodes,
      ...slidesObjects[6].nodes
    ];
    links = [
      ...slidesObjects[1].links,
      ...slidesObjects[2].links,
      ...slidesObjects[3].links,
      ...slidesObjects[4].links,
      ...slidesObjects[5].links,
      ...slidesObjects[6].links
    ];
    setupD3();
    window.graph = {
      nodes,
      links
    };
  }

  $('#contracts_amount').text(AppData.texts.contracts_amount_text);
  $('#contracts_type').text(AppData.texts.contracts_type_text);
  $('#contracts_total').text(AppData.texts.contracts_total_text);
  $('#direct_adjudication').text(AppData.texts.direct_adjudication_text);
  $('#direct_adjudication_percentage').text(AppData.texts.direct_adjudication_percentage_text);
  $('#suppliers_count').text(AppData.texts.suppliers_count_text);
  $('#big_amount_contracts').text(AppData.texts.big_amount_contracts_text);
  $('#big_amount_percentage').text(AppData.texts.big_amount_percentage_text);
  $('#big_amount_winners').text(AppData.texts.big_amount_winners_text);
  $('#slide_5_count').text(allFiguresCount);

  if(investigations)
    $('#slide_6_count').text(investigations.length || 0);

  setupFullPage();
}

function htmlEncode(text) {
  return $('<div/>').text(text).html();
}

function getContractsAmount(contracts) {
  return contracts.reduce((totalAmount, {amount}) => totalAmount + amount, 0).toFixed(0);
}

function getContractTypes(contracts) {
  const contractsSet = new MathSet(contracts);
  const contractsTypeFilter = new Filter({property: 'procedure_type'});
  const contractTypes = Object.keys(contractsSet.countByFilterProperty(contractsTypeFilter));
  return contractTypes;
}

function getContractsByTypes(contracts) {
  const contractsSet = new MathSet(contracts);
  const contractTypes = getContractTypes(contracts);
  const contractsByTypes = {};
  for (let i in contractTypes) {
    const contractType = contractTypes[i];
    const contractTypesFilter = new Filter({property: 'procedure_type', expected: contractType, operator: 'eq'});
    const contractsByType = contractsSet.filter(contractTypesFilter).toObject();
    contractsByTypes[contractType] = {
      amount: getContractsAmount(objectToArray(contractsByType)),
      name: contractType,
      contracts: contractsByType
    }
  }
  return contractsByTypes;
}

function objectToArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

function setNodeSizeToType(nodes, type, value) {
  return nodes;
  // return nodes.map(node => node.type !== type ? {...node, value} : node);
}

function redraw() {
  vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setupFullPage() {
  // const anchors = isMobile
  //   ? [
  //     'slide-1',
  //     'slide-2',
  //     'slide-3',
  //     'slide-4',
  //     'slide-5',
  //     'slide-6',
  //     'slide-7',
  //     'slide-8',
  //     'slide-9',
  //     'slide-10',
  //     'slide-11',
  //     'slide-12'
  //   ]
  //   : [
  //     'slide-1',
  //     'slide-2',
  //     'slide-3',
  //     'slide-4',
  //     'slide-5',
  //     'slide-6'
  //   ];
  const anchors = window.anchors


 // FIXME: que hacer con esto???
  $('#fullpage').fullpage({
    anchors: anchors,
    menu: '#slidesMenu',
    navigation: true,
    responsiveSlides: true,
    paddingTop: '10px',
    paddingBottom: '30px',
    responsiveWidth: 992,
    afterResponsive: function(isResponsive){
    },
    paddingTop: isMobile
      ? '0px'
      : ($('.site-top-ribbon').height() + 60) + 'px',
    scrollingSpeed: 300,
    onLeave: (index, nextIndex, direction) => {
      $(`.info-container`).removeClass('slide-active slide-leaving');
      $(`.slide-${index}`).removeClass('slide-active').addClass('slide-leaving');
      AppData.actualSlide = nextIndex - 1;
      let newZoom;
      $('.visualization-down-arrow').removeClass('hidden');
      $('.visualization-btns').addClass('hidden');
      if (isDesktop) {
        $('.labelText').removeClass('active');
        switch (nextIndex) {
          case 1:
            newZoom = 1;
            triggerUpdate(index, nextIndex, newZoom);
            $('.labelText.all').addClass('active');
            $('.labelText.contract_type').addClass('active');
            break;
          case 2:
            newZoom = 1;
            triggerUpdate(index, nextIndex, newZoom);
            $('.labelText.contract_type').addClass('active');
            break;
          case 3:
            newZoom = 0.5;
            triggerUpdate(index, nextIndex, newZoom);
            break;
          case 4:
            newZoom = 0.3;
            triggerUpdate(index, nextIndex, newZoom);
            break;
          case 5:
            newZoom = 0.20;
            triggerUpdate(index, nextIndex, newZoom);
            break;
          case 6:
            newZoom = 0.20;
            triggerUpdate(index, nextIndex, newZoom);
            $('.visualization-down-arrow').addClass('hidden');
            $('.visualization-btns').removeClass('hidden');
            break;
        }
      } else {
        triggerUpdate(index, nextIndex, newZoom);
      }
    },
    afterLoad: function(anchorLink, index) {
      $(`.slide-${index}`).addClass('slide-active');
    }
});




  function triggerUpdate(index, nextIndex, newZoom) {
    if (window.CustomEvent) {
      let event = new CustomEvent("update:visualization", {
        detail: {
          newZoom,
          nextIndex,
          index
        },
        bubbles: true,
        cancelable: true
      });

      document.dispatchEvent(event);
    }
  }

  $.fn.fullpage.moveTo('slide-2');
  $.fn.fullpage.moveTo('slide-1');
  $('.fullpage').animate({'opacity': 1});
  $('.visualization-down-arrow').click(() => {
    $.fn.fullpage.moveSectionDown();
  });
}

function setupD3() {
  zoom = d3.zoom().scaleExtent([0.1, 1]).on("zoom", zoomed);
  svg = d3.select("svg").call(zoom);
  const width = $('svg').width();
  const height = $('svg').height();
  const color = d3.scaleOrdinal(d3.schemeCategory20);

  function zoomed() {
    const stackcopado = `translate(${d3.event.transform.x},${d3.event.transform.y}) scale(${d3.event.transform.k})`;
    resG.attr('transform', stackcopado);
  }

  /* ----- Force Setup ----- */
  /* Charges */
  const forceManyBody = d3.forceManyBody();
  forceManyBody.strength(d => fs * d.nodeForce);
  /* Links */
  const forceLink = d3.forceLink();
  forceLink.id(d => d.id);
  forceLink.distance(d => ld * d.linkDistance * d.topParentNode
    ? 10
    : 1);
  forceLink.strength(d => ls * d.linkStrength);
  forceLink.iterations(2);
  /* Center force */
  const forceCenter = d3.forceCenter(width / 2 - offset, height / 2 - offset);
  /* Collides */
  const forceCollide = d3.forceCollide();
  forceCollide.iterations(1);

  /* Simulation Setup */
  const simulation = d3.forceSimulation().force("charge", forceManyBody).force("link", forceLink).force("center", forceCenter).force("collide", forceCollide).on("tick", ticked);

  let g = svg.append("g").attr("class", 'resizable-g');
  link = g.append("g").selectAll('link');
  node = g.append("g").selectAll('node');
  label = g.append("g").selectAll('.labelText');
  icon = g.append("g").selectAll('.nodeIcon');

  $(document).on("keydown", function(evt) {
    if (evt.keyCode == 27) {
      draw(graph);
      for (let l in graph.links) {
        const link = graph.links[l];
        link.selected = false;
        link.opacity = link.hidden
          ? 0
          : 0.6;
      }

      for (let l in graph.nodes) {
        const node = graph.nodes[l];
        node.opacity = 1;
        node.selected = false;
      }
    }
  })

  function ticked() {
    node.attr("cx", d => d.x + offset).attr("cy", d => d.y + offset).attr("opacity", d => d.opacity).attr("class", d => "nodes " + d.type + " " + (d.visibleNode
      ? "visible-node"
      : "invisible-node"))

    link.attr("x1", d => d.source.x + offset).attr("y1", d => d.source.y + offset).attr("x2", d => d.target.x + offset).attr("y2", d => d.target.y + offset).attr("opacity", d => d.opacity);

    label.attr("x", function(d) {
      return d.x - this.getBBox().width / 2;
    }).attr("y", function(d) {
      const fontSize = parseInt(window.getComputedStyle(this, null).getPropertyValue("font-size").split('px')[0]);
      return d.y - this.getBBox().height / 2 + fontSize;
    }).attr("opacity", d => d.opacity);

    icon.attr("x", d => d.x + offset).attr("y", d => d.y + offset).attr("opacity", d => d.opacity).attr("class", d => "nodes " + d.type + " " + (d.visibleNode
      ? "visible-node"
      : "invisible-node"));
  }

  window.addEventListener("resize", function() {
    const newTranslateX = $('svg').width() / 2 * (1 - zoomLevel);
    const newTranslateY = $('svg').height() / 2 * (1 - zoomLevel);
    if (resG)
      svg.call(zoom.transform, d3.zoomIdentity.translate(newTranslateX, newTranslateY).scale(zoomLevel));
    draw(graph);
  });

  const slide_1 = new Filter({property: 'type', operator: 'eq', expected: 'all'});
  const slide_2 = new Filter({property: 'type', operator: 'eq', expected: 'contract_type'});
  const slide_3 = new Filter({property: 'type', operator: 'eq', expected: 'contract'});
  const slide_4 = new Filter({property: 'type', operator: 'eq', expected: 'organization'});
  const slide_5 = new Filter({property: 'type', operator: 'eq', expected: 'related'});
  const slide_6 = new Filter({property: 'type', operator: 'eq', expected: 'investigation'});

  function goToSlide(index) {
    switch (index) {
      case 0:
        graph = {
          nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1).toObject()), 'all', 3),
          links: objectToArray((new MathSet(links)).filter(slide_1).toObject())
        };
        draw(graph);
        d3.selectAll('.nodes.all').transition().attr('r', d => d.activeSize);
        break;
      case 1:
        graph = {
          nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1, slide_2).toObject()), 'contract_type', 3),
          links: objectToArray((new MathSet(links)).filter(slide_1, slide_2).toObject())
        };

        draw(graph);
        d3.selectAll('.nodes.contract_type').transition().attr('r', d => d.activeSize);
        d3.selectAll('.all').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.links.contract_type').transition().delay(100).attr('opacity', d => d.opacity);
        break;
      case 2:
        graph = {
          nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1, slide_2, slide_3).toObject()), 'contract', 3),
          links: objectToArray((new MathSet(links)).filter(slide_1, slide_2, slide_3).toObject())
        };
        draw(graph);
        d3.selectAll('.nodes.contract').transition().attr('r', d => d.activeSize);
        d3.selectAll('.all').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.contract_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.links.contract').transition().delay(100).attr('opacity', d => d.opacity);
        break;
      case 3:
        graph = {
          nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1, slide_2, slide_3, slide_4).toObject()), 'organization', 4),
          links: objectToArray((new MathSet(links)).filter(slide_1, slide_2, slide_3, slide_4).toObject())
        };
        draw(graph);
        d3.selectAll('.nodes.organization').transition().attr('r', d => d.activeSize);
        d3.selectAll('.all').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.contract_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.organization_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.links.organization').transition().delay(100).attr('opacity', d => d.opacity);
        break;
      case 4:
        graph = {
          nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1, slide_2, slide_3, slide_4, slide_5).toObject()), 'related', 4),
          links: objectToArray((new MathSet(links)).filter(slide_1, slide_2, slide_3, slide_4, slide_5).toObject())
        };
        draw(graph);
        d3.selectAll('.nodes.organization').transition().attr('r', d => d.activeSize);
        d3.selectAll('.all').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.contract_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.organization_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.links.organization').transition().delay(100).attr('opacity', d => d.opacity);
        d3.selectAll('.links.related').transition().delay(100).attr('opacity', d => d.opacity);
        break;
      case 5:
        graph = {
          nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1, slide_2, slide_3, slide_4, slide_5, slide_6).toObject()), 'investigation', 4),
          links: objectToArray((new MathSet(links)).filter(slide_1, slide_2, slide_3, slide_4, slide_5, slide_6).toObject())
        };
        draw(graph);
        d3.selectAll('.nodes.organization').transition().attr('r', d => d.activeSize);
        d3.selectAll('.all').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.contract_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.organization_type').transition().attr('r', d => d.inactiveSize);
        d3.selectAll('.links.organization').transition().delay(100).attr('opacity', d => d.opacity);
        d3.selectAll('.links.related').transition().delay(100).attr('opacity', d => d.opacity);
        break;
    }
  }

  document.addEventListener("update:visualization", updateVisualization);
  function updateVisualization(evt) {
    zoomLevel = evt.detail.newZoom;
    const nextIndex = evt.detail.nextIndex;
    const newTranslateX = $('svg').width() / 2 * (1 - zoomLevel);
    const newTranslateY = $('svg').height() / 2 * (1 - zoomLevel);
    if (resG)
      svg.call(zoom.transform, d3.zoomIdentity.translate(newTranslateX, newTranslateY).scale(zoomLevel));
    goToSlide(nextIndex - 1);
  }

  graph = {
    nodes: setNodeSizeToType(objectToArray((new MathSet(nodes)).filter(slide_1).toObject()), 'all', 3),
    links: objectToArray((new MathSet(links)).filter(slide_1).toObject())
  };
  draw(graph);
  d3.selectAll('.nodes.all').transition().attr('r', d => d.activeSize);
  tooltipHTML = $('.tooltip');
  function draw(graph) {
    const container = $('svg');
    const svg = $('svg');
    resG = $('.resizable-g');
    const width = container.width();
    const height = container.height();
    let scaleMin;
    let tooltip;
    let tooltipLink;

    if (isDesktop) {
      tooltip = d3.select(".tooltip").attr("class", "tooltip").style("opacity", 0).on("mouseover", function() {
        tooltip.transition().duration(300).style("opacity", .98)
      }).on("mouseout", function() {
        tooltip.transition().duration(100).style("opacity", 0).style("pointer-events", "none")
      });
      tooltipLink = d3.select(".tooltip a").on("mouseover", function() {
        tooltip.transition().duration(300).style("opacity", .98)
      }).on("mouseout", function() {
        tooltip.transition().duration(100).style("opacity", 0).style("pointer-events", "none")
      }).on("click", function(evt) {
        evt.preventDefault()
      });
    }

    function dragstart(d, i) {
      if (!d3.event.active)
        simulation.alphaTarget(0.2).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragmove(d, i) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragend(d, i) {
      if (!d3.event.active)
        simulation.alphaTarget(0.0001);
      d.fx = null;
      d.fy = null;
    }

    node = node.data(graph.nodes.filter(d => d.icon == null));
    node.exit().remove();
    node = node.enter().append("circle").attr("r", d => d.activeSize).attr("fill", d => d.color).attr("class", d => "nodes " + d.type + " " + (d.visibleNode
      ? "visible-node"
      : "invisible-node")).merge(node);

    if (isDesktop)
      attachEventsToNode(node);

    node.each(d => {
      if (d.type === 'all') {
        d.fx = width / 2 - offset;
        d.fy = height / 2 - offset;
      } else {
        d.fx = null;
        d.fy = null;
      }
    });

    link = link.data(graph.links);
    link.exit().remove();
    link = link.enter().append("line").attr("class", d => "links " + d.type).attr("stroke-linecap", d => d.dashed
      ? "round"
      : "").attr("stroke-dasharray", d => d.dashed
      ? "1, 10"
      : "").attr("stroke-width", d => d.dashed
      ? "3"
      : "1").style("stroke", d => d.color).attr("opacity", 0).merge(link);

    label = label.data(graph.nodes.filter(d => d.label));
    label.exit().remove();
    label = label.enter().append("text").text(d => d.label).attr("class", d => "labelText " + d.type).merge(label);

    icon = icon.data(graph.nodes.filter(d => d.icon));
    icon.exit().remove();
    icon = icon.enter().append("image").attr("xlink:href", function(d) {
      return d.icon;
    }).attr("width", "80px").attr("height", "80px").attr("transform", "translate(-40, -40)").attr("class", d => "nodes " + d.type + " " + (d.visibleNode
      ? "visible-node"
      : "invisible-node")).merge(icon);

    if (isDesktop)
      attachEventsToNode(icon);

    if (isDesktop) {
      const node_drag = d3.drag().on("start", dragstart).on("drag", dragmove).on("end", dragend);
      node.call(node_drag)
      icon.call(node_drag)
    }

    icon.each(d => {
      if (d.type === 'all') {
        d.fx = width / 2 - offset;
        d.fy = height / 2 - offset;
      } else {
        d.fx = null;
        d.fy = null;
      }
    });

    forceManyBody.strength(d => fs * d.nodeForce);
    forceLink.distance(d => ld * d.linkDistance);
    forceLink.strength(d => ls * d.linkStrength * d.topParentNode
      ? 1
      : 2);
    forceCollide.radius(d => d.inactiveSize / 2);

    simulation.nodes(graph.nodes);
    simulation.force("link").links(graph.links);
    simulation.force("center", d3.forceCenter(width / 2 - offset, height / 2 - offset))
    simulation.alpha(0.2).restart();
    link.each(d => {
      d.target.visibleNode = true;
      d.source.visibleNode = true;
    });

    function attachEventsToNode(node) {
      node.on("mouseover", function(d) {
        const tooltipWidth = tooltipHTML.width() + 20;
        const tooltipHeight = tooltipHTML.height() + 20;
        tooltip.transition().duration(300).style("opacity", .98).style("pointer-events", "initial");
        tooltip.html(() => {
          switch (d.type) {
            case "all":
              {
                const contractsTotalText = AppData.texts.contracts_total_text;
                const contractsAmountText = AppData.texts.contracts_amount_text;
                return `
                      <p class="title">${projectTitle}</p>
                <p>Número de contratos: <span>${contractsTotalText}</span></p>
                <p>Importe contratado: <span>$${contractsAmountText}M</span></p>
                `; // FIXME esto debe ser parametrizable para cambiar el título del proyecto dentro del tooltip
                break;
              }
            case "contract_type":
              {
                const contractsCountText = d.contractsCount;
                const contractsAmountText = numberWithCommas((+ d.contractsAmount).toFixed(0));
                return `
                      <p class="title">${d.name}</p>
                <p>Número de contratos: <span>${contractsCountText}</span></p>
                <p>Importe contratado: <span>$${contractsAmountText}</span></p>
                `;
                break;
              }
            case "contract":
              {
                const suppliersListHTML = d.suppliersList.map(supplier => `<li>${supplier}</li>`).join('')
                const amountText = numberWithCommas((+ d.amount).toFixed(0));
                return `
                      <p class="title">${d.name}</p>
                      <span>Proveedores:</span>
                <ul> ${suppliersListHTML}</ul>
                <p>Importe contratado: <span>$${amountText}</span></p>
                `;
                break;
              }
            case "organization":
              {
                const nameText = d.name;
                const contractsCountText = d.contractsCount || "Desconocido";
                const contractsAmount = numberWithCommas((+ d.contractsAmount).toFixed(0));
                return `
                      <p class="title">${nameText}</p>
                <p>Número de contratos: <span>${contractsCountText}</span></p>
                <p>Importe contratado: <span>$${contractsAmount}</span></p>
                `;
                break;
              }
            case "related":
              {
                const nameText = d.name;
                const contractsCount = d.contractsCount || "Desconocido";
                const typeText = d.relationType == "person"
                  ? "persons"
                  : "orgs";
                return `
                      <p class="title">${nameText}</p>
                      <p>Contratos: ${contractsCount}</p>
                      <p>Leer la nota:</p>
                      <p><a rel="noreferrer noopener" target="_blank" href="https://quienesquien.wiki/${typeText}/${nameText}">https://quienesquien.wiki/${typeText}/${nameText}</a></p>
                `;
                break;
              }
            case "investigation":
              {
                const nameText = d.name;
                const urlText = d.url;
                return `
                      <p class="title">${nameText}</p>
                      <p>Leer la nota:</p>
                      <p><a rel="noreferrer noopener" target="_blank" href="${urlText}">${urlText}</a></p>
                `;
                break;
              }
            default:
              {
                return "sin texto"
                break;
              }
          }
        }).style("left", (d3.event.pageX - tooltipWidth - 30) + "px").style("top", (d3.event.pageY - tooltipHeight / 2) + "px");
      }).on("mousemove", function(d) {
        const tooltipWidth = tooltipHTML.width() + 20;
        const tooltipHeight = tooltipHTML.height() + 20;
        tooltip.style("left", (d3.event.pageX - tooltipWidth - 30) + "px").style("top", (d3.event.pageY - tooltipHeight / 2) + "px");
      }).on("mouseout", function(d) {
        tooltip.transition().duration(100).style("opacity", 0).style("pointer-events", "initial");
      }).on("mousedown", function(d) {
        globalTimers.forEach(timer => cancelAnimationFrame(timer));
        const linkId = d.id;
        for (let l in links) {
          const link = links[l];
          if (link.opacity != 0) {
            link.lastOpacity = link.opacity;
            link.opacity = 0.15;
          }
          link.selected = false;
        }

        for (let l in nodes) {
          const node = nodes[l];
          if (node.opacity != 0) {
            node.lastOpacity = node.opacity;
            node.opacity = 0.15;
          }
          node.selected = false;
        }

        const onlyParents = 'onlyparents';
        const onlyChilds = 'onluchilds';

        switch (d.type) {
          case "contract":
          case "contract_type":
          case "organization":
          case "related":
            globalTimers.push(requestAnimationFrame((function(linkId, onlyChilds) {
              return function() {
                showSelectedLinks(linkId, onlyChilds)
              };
            })(linkId, onlyChilds)));
						globalTimers.push(requestAnimationFrame((function(linkId, onlyParents) {
              return function() {
                showSelectedLinks(linkId, onlyParents)
              };
            })(linkId, onlyParents)));
						break;
          case "all":
            globalTimers.push(requestAnimationFrame((function(linkId, onlyParents) {
              return function() {
                showSelectedLinks(linkId, onlyParents)
              };
            })(linkId, onlyParents)));
						break;
          default:
            globalTimers.push(requestAnimationFrame((function(linkId, onlyChilds) {
              return function() {
                showSelectedLinks(linkId, onlyChilds);
              }
            })(linkId, onlyChilds)));
						break;
        }

        function showSelectedLinks(linkId, onlyType) {
          const selectedLinks = links.filter(link => {
            const findOnlyParents = onlyType == onlyParents;
            const iAmAChild = link.target;
            const iAmAParent = link.source;
            let linkType;
            if (findOnlyParents) {
              linkType = iAmAChild;
            } else {
              linkType = iAmAParent;
            }
            return linkType.id == linkId;
          });
          for (let l in selectedLinks) {
            const selectedLink = selectedLinks[l];
            if (selectedLink.selected == true) {
              continue;
            }
            if (selectedLink.hidden) {
              continue;
            }
            selectedLink.lastOpacity = selectedLink.opacity;
            selectedLink.opacity = 1;
            selectedLink.selected = true;

            const findOnlyParents = onlyType == onlyParents;
            const iAmAChild = selectedLink.target;
            const iAmAParent = selectedLink.source;
            let linkType;
            if (findOnlyParents) {
              linkType = iAmAParent;
            } else {
              linkType = iAmAChild;
            }
            globalTimers.push(requestAnimationFrame((function(linkId) {
              return function() {
                showSelectedNodes(linkId);
              }
            })(selectedLink.source.id)))
            globalTimers.push(requestAnimationFrame((function(linkId) {
              return function() {
                showSelectedNodes(linkId);
              }
            })(selectedLink.target.id)))

            globalTimers.push(requestAnimationFrame((function(linkTypeId, onlyType) {
              return function() {
                showSelectedLinks(linkTypeId, onlyType);
              }
            })(linkType.id, onlyType)))
          }
        }

        function showSelectedNodes(linkId) {
          const selectedNodes = nodes.filter(node => {
            return (node.id == linkId);
          });

          for (let n in selectedNodes) {
            const selectedNode = selectedNodes[n];
            selectedNode.lastOpacity = selectedNode.opacity;
            selectedNode.opacity = 1;
            selectedNode.selected = true;
          }
        }
      });
    }
  }
}




/*
_-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*
...from filters.js
*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-_
*/

function Filter(opts) {
  this.operator = opts.operator;
  this.expected = opts.expected;
  this.property = opts.property;
  this.modifier = null;
  this.flow = "actived";
}

Filter.prototype.closed = function(value) {
  if (value === false) return this;
  var closedFilter = new Filter(this);
  closedFilter.flow = "closed";
  return closedFilter;
};

Filter.prototype.bypassed = function(value) {
  if (value === false) return this;
  var bypassedFilter = new Filter(this);
  bypassedFilter.flow = "bypassed";
  return bypassedFilter;
};

Filter.prototype.actived = function(value) {
  if (value === false) return this;
  var activedFilter = new Filter(this);
  activedFilter.flow = "actived";
  return activedFilter;
};

Filter.prototype.not = function(value) {
  if (value === false) return this;
  var notFilter = new Filter(this);
  notFilter.modifier = "not";
  return notFilter;
};

Filter.prototype.applyFilter = function(value) {
  if (this.flow === "closed") return false;
  if (this.flow === "bypassed") return true;
  var result = null;
  var a = value;
  var b = this.expected;
  switch (this.operator) {
    case "eq":
      result = a == b;
      break;
    case "equ":
      result = a.toLowerCase() == b.toLowerCase();
      break;
    case "fn":
      result = b(a);
      break;
    default:
      result = true;
  }

  let finalResult;
  switch (this.modifier) {
    case "not":
      finalResult = !result;
      break;
    default:
      finalResult = result;
  }
  return finalResult;
}




/*
_-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*
...from sets.js
*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-_
*/

function MathSet(obj) {
  this.SetObject = obj || {};
  this.indexes = {};
}

MathSet.prototype.get = function(key) {
  return this.SetObject[key];
};

MathSet.prototype.set = function(key, value) {
  return this.SetObject[key] = value;
};

MathSet.prototype.toObject = function() {
  return this.SetObject;
};

MathSet.prototype.indexBy = function(property) {
  var propertyBreadcrumb = property.split(".");
  var thisSet = this.SetObject;

  this.indexes[property] = [];
  for (var i in thisSet) {
    var cursor = thisSet[i];
    for (var p in propertyBreadcrumb) {
      var index = propertyBreadcrumb[p];
      cursor = cursor[index];
    }
    if (this.indexes[property][cursor] === undefined) this.indexes[property][cursor] = [];
    this.indexes[property][cursor].push({
      key: i,
      value: thisSet[i]
    });
  }

  return this.SetObject;
};

MathSet.prototype.filter = function(paramFilters) {
  var filters = [];
  for (var a = 0; a < arguments.length; a++) {
    var paramFilters = arguments[a];
    filters = filters.concat(paramFilters instanceof Filter ? [paramFilters] : paramFilters);
  }
  var thisSet = this.SetObject;
  var resultSet = {};

  for (var f in filters) {
    var filter = filters[f];
    var propertyBreadcrumb = filter.property.split(".");
    for (var i in thisSet) {
      var cursor = thisSet[i];
      for (var p in propertyBreadcrumb) {
        var index = propertyBreadcrumb[p];
        cursor = cursor[index];
      }
      if (filter.applyFilter(cursor)) {
        resultSet[i] = thisSet[i];
      }
    }
  }
  return new MathSet(resultSet);
};

MathSet.prototype.serialFilter = function(paramFilters) {
  var filters = [];
  for (var a in arguments) {
    var paramFilters = arguments[a];
    filters = filters.concat(paramFilters instanceof Filter ? [paramFilters] : paramFilters);
  }

  var filteredSet = this;

  for (var f in filters) {
    var filter = filters[f];
    filteredSet = filteredSet.filter(filter);
  }
  return filteredSet;
};

MathSet.prototype.count = function() {
  return Object.keys(this.SetObject).length;
};

MathSet.prototype.countByFilterProperty = function(filter) {
  var property = filter.property;
  var propertyBreadcrumb = property.split(".");
  var thisSet = this.SetObject;

  var count = [];
  for (var i in thisSet) {
    var cursor = thisSet[i];
    for (var p in propertyBreadcrumb) {
      var index = propertyBreadcrumb[p];
      cursor = cursor[index];
    }
    if (count[cursor] === undefined) count[cursor] = 0;
    count[cursor]++;
  }

  return count;
};

MathSet.prototype.indexedByOriginalKey = function() {
  var thisSet = this.SetObject;
  var resultSet = {};
  for (var i in thisSet) {
    var elements = thisSet[i];
    for (var el in elements) {
      var element = elements[el];
      resultSet[element.key] = element.value;
    }
  }
  return resultSet;
};


/* SETS OPERATIONS */

/* UnionBy */
MathSet.prototype.unionBy = function(property, newSet) {
  try {
    var indexedThisSet = this.indexes[property];
  } catch (err) {
    throw ("You have to define the '" + property + "' index before call unionBy");
    return this;
  }
  newSet = newSet instanceof MathSet ? newSet : new MathSet(newSet);
  newSet.indexBy(property);
  var indexedNewSet = newSet.indexes[property];

  var indexedResultSet = {};


  for (var i in indexedThisSet) {
    indexedResultSet[i] = indexedThisSet[i];
  }

  for (var i in indexedNewSet) {
    indexedResultSet[i] = indexedNewSet[i];
  }
  indexedResultSet = new MathSet(indexedResultSet);

  var resultSet = indexedResultSet.indexedByOriginalKey();
  return new MathSet(resultSet);
};

/* Union */
MathSet.prototype.union = function(newSet) {
  newSet = newSet instanceof MathSet ? newSet.SetObject : newSet;
  var resultSet = {};
  var thisSet = this.SetObject;
  for (var i in thisSet) {
    resultSet[i] = thisSet[i];
  }
  for (var i in newSet) {
    resultSet[i] = newSet[i];
  }
  return new MathSet(resultSet);
};

/* Intersection */
MathSet.prototype.intersection = function(newSet) {
  newSet = newSet instanceof MathSet ? newSet.SetObject : newSet;
  var resultSet = {};
  var thisSet = this.SetObject;
  for (var i in thisSet) {
    if (newSet.hasOwnProperty(i)) {
      resultSet[i] = newSet[i];
    }
  }
  return new MathSet(resultSet);
};

/* Difference */
MathSet.prototype.difference = function(newSet) {
  newSet = newSet instanceof MathSet ? newSet.SetObject : newSet;
  var resultSet = {};
  var thisSet = this.SetObject;
  for (var i in thisSet) {
    resultSet[i] = thisSet[i];
  }
  for (var i in newSet) {
    delete resultSet[i];
  }
  return new MathSet(resultSet);
};

/* Complement */
MathSet.prototype.complement = function(newSet) {
  newSet = newSet instanceof MathSet ? newSet.SetObject : newSet;
  var resultSet = {};
  var thisSet = this.SetObject;
  for (var i in newSet) {
    if (!thisSet.hasOwnProperty(i)) {
      resultSet[i] = newSet[i];
    }
  }
  return new MathSet(resultSet);
};

/* Symmetric Difference */
MathSet.prototype.symmetricDifference = function(newSet) {
  newSet = newSet instanceof MathSet ? newSet.SetObject : newSet;
  var thisSet = this;
  var union = thisSet.union(newSet);
  var intersection = thisSet.intersection(newSet);
  var resultSet = intersection.complement(union).SetObject;
  return new MathSet(resultSet);
};

MathSet.prototype.log = function() {
  var text = "{ " + Object.keys(this.toObject()).join(" , ") + " }";
  console.log(text);
};
