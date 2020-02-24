$(document).ready(function () {

    //call different approach
    // $.when(loadMainTable())
    // .then(loadPieChart());
    loadPageContent();

    //variable to indicate new row addition
    var newAdd = false;

    //global table variable
    var table;

    var options = {
        keyboard: false
    };

    var rowIndexForUpdate = -1;

    //validate the modal
    $("#modalForm").validate({
        rules: {
            id: "required"
        },
    })

    //Update the record in the database and update the table entry
    $('#btnUpdate').on('click',btnUpdate_onClick);

    function btnUpdate_onClick(){
        var cct_num = $('#cct_num').val();
        var business_name = $('#business_name').val();
        var status = $('#status').val();
        var sector = $('#category').val();
        var city = $('#city').val();
        var street_add = $('#street_add').val();
        var zip = $('#zip').val();
        var id = $("#id").val();

        //$('#modalForm').valid();
        //if modal values missing, return
        if(!($('#modalForm').valid())){
            return;
        }

        var address = { city:city , zip:zip, street: street_add};
        console.log("address obj"+address);

        var update_object =  {
            id: id,
            certificate_number: cct_num,
            business_name: business_name,
            result: status,
            sector: sector,
            address: JSON.stringify(address)
        };

        //update_object = JSON.stringify(update_object);

        console.log(update_object);

        //post data to update
        $.ajax({
            type: "POST",
            url: '/dashboard',
            data: update_object,
            success: function(data){
                console.log("Upsert successful!");
                console.log(data);
                if(newAdd){
                    //The second argument is optional and determines whether the data is added to the top or bottom of the table. 
                    //A value of true will add the data to the top of the table
                    table.addData(data, true);
                    newAdd = false;

                }
                else{
                    table.updateData(data);
                }
                
            },
            
          });
        $('#detailsModal').modal('hide');

    }


    //Set modal values
    function setModalValues(data){
        
        $('#id').attr('readonly',true);
        $('#id').val(data.id);
        $('#cct_num').val(data.certificate_number);
        $('#business_name').val(data.business_name);
        $('#city').val(data.address.city);
        $('#status').val(data.result);
        $('#category').val(data.sector);
        $('#street_add').val(data.address.street);
        $('#zip').val(data.address.zip);

        //Show delete button
        $("#btnDelete").show();
    }


    //Insert new record on clicking add new button
    $('#btnAdd').on('click',btnAdd_onClick);

    function btnAdd_onClick(){
        
        $('#id').attr('readonly',false);
        $('#cct_num').val("");
        $('#business_name').val("");
        $('#status').val("");
        $('#category').val("");
        $('#city').val("");
        $('#street_add').val("");
        $('#zip').val("");
        $("#id").val("");

        $('#detailsModal').modal(options);
        $('#detailsModalLabel').text("Add new record");

        $("#btnDelete").hide();

        newAdd = true;
    }

    

    //Delete the record in the database and delete the table entry
    $('#btnDelete').on('click',function(){

        var id = $('#id').val();

        var confirmation = confirm("Are you sure to delete record with ID - "+id+" ?");

        if(confirmation){

            delete_object = { id : id};
            
            $.ajax({
                type: "POST",
                url: '/dashboard/delete',
                data: delete_object,
                success: function(data){
                                //console.log(data.length);
                                table.deleteRow(id); //Delete row with id
                                $('#detailsModal').modal('hide');

                        },
                error: function(_,status,err){
                        console.log(status,err);
                        alert("Error occured!"+err);
                    }

        })

        }
    });

    function loadMainTable(){

    table = new Tabulator("#example", {
        layout:"fitColumns",
        pagination:"remote", //enable remote pagination
        ajaxURL:"/dashboard/getpage", //set url for ajax request
        paginationSize:10, //optional parameter to request a certain number of rows per page
        ajaxFiltering:true, //Filtering is done at the server side
        columns:[
            {title:"ID", field:"id", sorter:"number"},
            {title:"Certificate Number", field:"certificate_number", sorter:"number"},
            {title:"business Name", field:"business_name", sorter:"string", },
            {title:"Result", field:"result", sorter:"string",align:"center"}
        ],
        rowClick:function(e, row){  //Open modal to update data
            //e - the click event object
            //row - row component
                $('#detailsModal').modal(options);
                console.log(row);
                $('#detailsModalLabel').text(row._row.data.business_name);

                setModalValues(row._row.data);
            },
    });
  
    };


    $('#filter').on('click',function(data){

        var filterfield = $('#filter-field').val();
        var filterval = $('#filter-value').val();

        table.setFilter(filterfield,"like",filterval);

    });

    $('#filter-clear').on('click',function(){
        table.clearFilter();
        $('#filter-value').val('');
        $('#filter-field').val('-1');
    });



    function loadPageContent(){
        var results = {}
            $.ajax({
                type: "GET",
                url: '/stats',
                async: false,
                error: function(_,status,err){
                    console.log(status,err);
                    alert("Error occured!"+err);
                },
                success:function(data){
                    renderChart(data);

                    //After the data is loaded, load the main table
                    loadMainTable();
                }});
    }


    //Draw the pie chart
    function renderChart(data){
        this.results=JSON.parse(data);
        console.log(this.results);
        values = Object.values(this.results);
        labels = Object.keys(this.results);

        function getDataPoints(){

            result = [];

            for(var i=0;i<labels.length;i++){
                result.push({y:values[i], label:labels[i]})

            }
            return result;
        }
        // console.log(values);
        // console.log(labels);

            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Results at a glance",
                    fontFamily: "tahoma",
                    fontWeight: "normal",
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "##0",
                    indexLabel: "{label} {y}",
                    dataPoints: getDataPoints()
                }]
            });
            chart.render();
        
    }

    
  });