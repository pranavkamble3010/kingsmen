$(document).ready(function () {
    var table = $('#dashTable').DataTable();

    var options = {
        keyboard: false
    };

    var rowIndexForUpdate = -1;

    //display full data into the modal
    $('#dashTable tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();

        //save this for further update
        rowIndexForUpdate = table.row(this).index();
        //$("#cardHeader").text(data[2]);
        $('#detailsModal').modal(options);
        $('#detailsModalLabel').text(data[2]);
        setModalValues(data);
        $('#id').attr('readonly',true);
        $('#id').class('form-control-plaintext');
        console.log(rowIndexForUpdate);
    } );


    //Update the record in the database and update the table entry
    $('#btnUpdate').on('click',function(){

        var cct_num = $('#cct_num').val();
        var business_name = $('#business_name').val();
        var status = $('#status').val();
        var sector = $('#category').val();
        var city = $('#city').val();
        var street_add = $('#street_add').val();
        var zip = $('#zip').val();
        var id = $("#id").val();

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
                console.log(data);

                data = JSON.parse(data);

                table.cell(rowIndexForUpdate,0)
                .data(data[0].id);

                table.cell(rowIndexForUpdate,1)
                .data(data[0].certificate_number);

                table.cell(rowIndexForUpdate,2)
                .data(data[0].business_name);

                table.cell(rowIndexForUpdate,3)
                .data(data[0].result);

                table.cell(rowIndexForUpdate,4)
                .data(data[0].address.city);

                table.cell(rowIndexForUpdate,5)
                .data(data[0].address.sector,data[0].address.street,data[0].address.zip);

                table.draw();
            },
            
          });
        $('#detailsModal').modal('hide');

    })


    //Set modal values
    function setModalValues(data){

        var miscFields = data[5].split(';');

        $('#id').val(data[0]);
        $('#cct_num').val(data[1]);
        $('#business_name').val(data[2]);
        $('#city').val(data[4]);
        $('#status').val(data[3]);
        $('#category').val(miscFields[0]);
        $('#street_add').val(miscFields[1]);
        $('#zip').val(miscFields[2]);

    }


    //Insert new record on clicking add new button
    $('#btnAdd').on('click',function(){
        rowIndexForUpdate = table.rows().count();
        console.log(rowIndexForUpdate);
        $('#detailsModal').modal(options);
        $('#detailsModalLabel').text("Add new record");  
        $('#id').attr('readonly',false);
    })

  });