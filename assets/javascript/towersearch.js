var organizations_data = null;
var contracts_data = null;
var table = null;
var hiddenContracts = [];

function initSearch() {
    table = $('#contracts_search').DataTable( {
        dom: "tp",
        pagingType: "numbers",
        data: organizations_data,
        columnDefs: [
            { className: "dt-left", targets: [0] },
            { className: "dt-center", targets: [1] },
            { className: "dt-right", targets: [2] }
        ],
        columns: [
            {
                title: "Empresas",
                data: "name",
                type: "string",
                searchable: "false"
            },
            {
                title: "Cant. de Contratos",
                data: "contracts_count",
                type: "num",
                searchable: "false"
            },
            {
                title: "Monto Total",
                data: "contracts_amount",
                type: "num",
                render: function(data, type, row, meta) { return data.toFixed(2) },
                searchable: "false"
            }
        ],
        order: [[0, 'asc']]
    } );

    populateChildRows();

    var contract_types = getContractTypes();
    var procedure_types = getProcedureTypes();

    contract_types.map( (type) => {
        if(type != '') { $('#search-contractType').append(new Option(type, type, false, false)) }
    } );
    procedure_types.map( (type) => {
        if(type != '') { $('#search-procedureType').append(new Option(type, type, false, false)) }
    } );

    $('#contracts_search tbody').on( 'click', 'td', function() {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child.show();
            tr.addClass('shown');
        }
    } );

    $('#search-fromAmount, #search-toAmount, #search-text').keyup( function() {
        table.draw();
    } );
    $('#search-dateFrom, #search-dateTo, #search-contractType, #search-procedureType').on( 'change', function() {
        table.draw();
    } );

    $.fn.dataTable.ext.search.push(
        // Reset los contratos a ocultar
        function() { hiddenContracts = []; return true; },

        // Todos los filtros
        function( settings, data, dataIndex ) {
            // Filtro de búsqueda de texto
            var text = $('#search-text').val();

            // Filtro de monto de contrato
            var min = parseInt( $('#search-fromAmount').val(), 10 );
            var max = parseInt( $('#search-toAmount').val(), 10 );

            // Filtro de rango de fechas
            var dateFrom = Date.parse( $('#search-dateFrom').val() );
            var dateTo = Date.parse( $('#search-dateTo').val() );

            // Filtro de tipo de contrato
            var contractType = $('#search-contractType').val();

            // Filtro de tipo de contrato
            var procedureType = $('#search-procedureType').val();

            var data = table.row(dataIndex).data();
            // Chequear si algun contrato de la org cumple con los filtros, si ninguno cumple oculta la org, de lo contrario muestra los que cumplen
            var found = data.contracts.filter( (contract) => {
                // Filtro de búsqueda de texto
                var rx = new RegExp(text.trim().replace(' ', '|'));
                if(!rx.test(contract.title)) {
                    hiddenContracts.push(contract.ocid + '_' + contract.start_date);
                    return false;
                }

                // Filtro de monto de contrato
                var amount = parseInt( contract.amount, 10 );
                if ( ( isNaN( min ) && isNaN( max ) ) ||
                 ( isNaN( min )  && amount <= max ) ||
                 ( min <= amount && isNaN( max ) ) ||
                 ( min <= amount && amount <= max ) )
                {
                    // Nada, seguir probando
                }
                else {
                    hiddenContracts.push(contract.ocid + '_' + contract.start_date);
                    return false;
                }

                // Filtro de rango de fechas
                var contractDate = Date.parse( contract.start_date );
                if ( ( isNaN( dateFrom ) && isNaN( dateTo ) ) ||
                 ( isNaN( dateFrom )  && contractDate <= dateTo ) ||
                 ( dateFrom <= contractDate && isNaN( dateTo ) ) ||
                 ( dateFrom <= contractDate && contractDate <= dateTo ) )
                {
                    // Nada, seguir probando
                }
                else {
                    hiddenContracts.push(contract.ocid + '_' + contract.start_date);
                    return false;
                }

                // Filtro de tipo de contrato
                if(contractType != 'todos' && contractType != contract.type) {
                    hiddenContracts.push(contract.ocid + '_' + contract.start_date);
                    return false;
                }

                // Filtro de tipo de procedimiento
                if(procedureType != 'todos' && procedureType != contract.procedure_type) {
                    hiddenContracts.push(contract.ocid + '_' + contract.start_date);
                    return false;
                }

                return true;
            } );

            return (found.length > 0);
        },

        function() { populateChildRows(); return true }
    );
}

function populateChildRows() {
    table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var rowData = this.data();
        this.child( populateContracts(rowData) );
    } );
}

function getContractTypes() {
    var types = [];
    contracts_data.map( (contract) => {
        if(types.indexOf(contract.type) < 0) { types.push(contract.type) }
    } );
    return types;
}

function getProcedureTypes() {
    var types = [];
    contracts_data.map( (contract) => {
        if(types.indexOf(contract.procedure_type) < 0) { types.push(contract.procedure_type) }
    } );
    return types;
}

function populateContracts( data ) {
    // `d` is the original data object for the row
    var contracts = data.contracts;
    var childContent = '';

    contracts.map( (contract) => {
        if( hiddenContracts.indexOf(contract.ocid + '_' + contract.start_date) < 0 ) {
            var start_date = contract.start_date? contract.start_date.split('T') : ['', ''];
            var end_date = contract.end_date? contract.end_date.split('T') : ['', ''];

            childContent += '<table width="90%" align="center" id="' + contract.ocid + '">';
            childContent +=     '<tr>';
            childContent +=         '<td colspan="2">';
            childContent +=             '<strong>' + contract.title + '</strong>';
            childContent +=         '</td>';
            childContent +=     '</tr>';
            childContent +=     '<tr>';
            childContent +=         '<td width="50%">';
            childContent +=             'Monto: $' + contract.amount + '<br />';
            childContent +=             'Tipo de Procedimiento: ' + contract.procedure_type;
            childContent +=         '</td>';
            childContent +=         '<td width="50%">';
            childContent +=             'Inicio: ' + start_date[0] + '<br />';
            if(contract.end_date)
                childContent +=         'Finalización: ' + end_date[0] + '<br />';
            childContent +=             'OCID: ' + contract.ocid;
            childContent +=         '</td>';
            childContent +=     '</tr>';
            childContent += '</table>';
        }
    } );

    return childContent;
}


/*
_-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*
OCDS + OWNERS TRANSFORMATION
*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-__-=*^*=-_
*/

function buildSearchData(contracts_json) {
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
        contracts_data = contractsJson.data;
        organizations_data = organizationsJson.data;
        // Cargar la data al search
        initSearch();
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
