function justNumbers(e)
        {
        var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8) || (keynum == 46))
        return true;
         
        return /\d/.test(String.fromCharCode(keynum));
        }
		
function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }


function deshabilitabotones(){
    document.getElementById('editar-alimento').style.display = 'none';
    document.getElementById('guardar-alimento').style.display = 'none';
    document.getElementById('actualizar-alimento').style.display = 'none';
}
function limpiaform(){
    $("#aliId").val("");
    $("#aliNombre").val("");
    $("#aliKilos").val("");
    $("#aliMarca").val("");
    $("#aliDescri").val("");
 
}        
function habilitaform(){
    $("#aliId").prop( "disabled", false );
    $("#aliNombre").prop( "disabled", false );
    $("#aliKilos").prop( "disabled", false );
    $("#aliMarca").prop( "disabled", false );
    $("#aliDescri").prop( "disabled", false );
    
}
function deshabilitaform(){
    $("#aliId").prop( "disabled", true );
    $("#aliNombre").prop( "disabled", true );
    $("#aliKilos").prop( "disabled", true );
    $("#aliMarca").prop( "disabled", true );
    $("#aliDescri").prop( "disabled", true );
                
}    
$(document).ready(function(){

    function validarFormulario(){
        var txtNombre = document.getElementById('aliNombre').value;
        var txtKilos = document.getElementById('aliKilos').value;
		var txtMarca = document.getElementById('aliMarca').value;
		var txtDescri = document.getElementById('aliDescri').value;
		
                //Test campo obligatorio
                if(txtNombre == null || txtNombre.length == 0 || /^\s+$/.test(txtNombre)){
                    alert('ERROR: El campo nombre no debe ir vacío o con espacios en blanco');
                    document.getElementById('aliNombre').focus();
                    return false;
                }
                if(txtKilos == null || txtKilos.length == 0 || /^\s+$/.test(txtKilos)){
                    alert('ERROR: El campo kilos no debe ir vacío o con espacios en blanco');
                    document.getElementById('aliKilos').focus();
                    return false;
                }
				if(txtMarca == null || txtMarca.length == 0 || /^\s+$/.test(txtMarca)){
                    alert('ERROR: El campo marca no debe ir vacío o con espacios en blanco');
                    document.getElementById('aliMarca').focus();
                    return false;
                }
				if(txtDescri == null || txtDescri.length == 0 || /^\s+$/.test(txtDescri)){
                    alert('ERROR: El campo descripción no debe ir vacío o con espacios en blanco');
                    document.getElementById('aliDescri').focus();
                    return false;
                }
				
                return true;
            }			
    //funcion para listar 
    var getlista = function (){
        var datax = {
            "Accion":"listar"
        }
        $.ajax({
            data: datax, 
            type: "GET",
            dataType: "json", 
            url: "http://localhost:8080/proyecto_final/controllers/controlleralimento.php", 
        })
        .done(function( data, textStatus, jqXHR ) {
            $("#listaalimentos").html("");
            if ( console && console.log ) {
                console.log( " data success : "+ data.success 
                    + " \n data msg : "+ data.message 
                    + " \n textStatus : " + textStatus
                    + " \n jqXHR.status : " + jqXHR.status );
            }
            for(var i=0; i<data.datos.length;i++){
                                //$.each(data.datos[i], function(k, v) { console.log(k + ' : ' + v); });
                                console.log('id: '+data.datos[i].id + ' nombre: '+data.datos[i].nombre);
                                fila = '<tr><td>'+ data.datos[i].nombre +'</td>';
                                fila += '<td>'+ data.datos[i].kilos +'</td>';
								fila += '<td>'+ data.datos[i].marca +'</td>';
                                fila += '<td>'+ data.datos[i].descri +'</td>';
                                fila += '<td><button id="edita-alimento" type="button" '
                                fila += 'class="btn btn-xs btn-success" data-toggle="modal" data-target="#myModal"'
                                fila += ' onclick="veralimento(\'ver\',\'' + data.datos[i].id + '\')">';
                                fila += 'Ver / Editar</button>';
                                fila += ' <button id="delete-language-modal" name="delete-language-modal" type="button" ';
                                fila += 'class="btn btn-xs btn-danger" data-toggle="modal" data-target="#myModalDelete" ';
                                fila += 'onclick="deletealimento(\''+ data.datos[i].id +'\',\''
                                + data.datos[i].nombre +'\')">';
                                fila += 'Eliminar</button></td></tr>';
                                $("#listaalimentos").append(fila);
                            }
                        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                console.log( " La solicitud getlista ha fallado,  textStatus : " +  textStatus 
                    + " \n errorThrown : "+ errorThrown
                    + " \n textStatus : " + textStatus
                    + " \n jqXHR.status : " + jqXHR.status );
            }
        });
    }
    //var veralumno = function (action, aluid){

        //Levanta modal nuevo
        $("#crea-alimento").click(function(e){
            e.preventDefault();
            limpiaform();
            habilitaform();
            $("#Accion").val("registrar");
            $('#myModal').on('shown.bs.modal', function () {
                var modal = $(this);
                modal.find('.modal-title-form').text('Ingreso Alimento');  
                deshabilitabotones();
                $('#guardar-alimento').show();
                $('#aliNombre').focus();
            });
        });

        // implementacion boton para guardar
        $("#guardar-alimento").click(function(e){
            e.preventDefault();
            if(validarFormulario()==true){
                var datax = $("#formAlimento").serializeArray();
                $.each(datax, function(i, field){
                    console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                });
                $.ajax({
                    data: datax, 
                    type: "POST",
                    dataType: "json", 
                    url: "http://localhost:8080/proyecto_final/controllers/controlleralimento.php",  
                })
                .done(function( data, textStatus, jqXHR ) {
                    if ( console && console.log ) {
                        console.log( " data success : "+ data.success 
                            + " \n data msg : "+ data.message 
                            + " \n textStatus : " + textStatus
                            + " \n jqXHR.status : " + jqXHR.status );
                    }
                    $('#myModal').modal('hide');
                    $('#myModalLittle').modal('show');
                    $('#myModalLittle').on('shown.bs.modal', function () {
                        var modal2 = $(this);
                        modal2.find('.modal-title').text('Mensaje del Servidor');
                        modal2.find('.msg').text(data.message);  
                        $('#cerrarModalLittle').focus();
                    });
                    getlista();
                    deshabilitabotones();
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    if ( console && console.log ) {
                        console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                            + " \n errorThrown : "+ errorThrown
                            + " \n textStatus : " + textStatus
                            + " \n jqXHR.status : " + jqXHR.status );
                    }
                });
            }
        });
        $("#editar-alimento").click(function(e){
            e.preventDefault();
            $('.modal-title-form').text('Editar Alimento');
            habilitaform();
            deshabilitabotones();
            $('#actualizar-alimento').show();
            $("#Accion").val("actualizar");               
        });

        $("#actualizar-alimento").click(function(e){
                    // Detenemos el comportamiento normal del evento click sobre el elemento clicado
                    e.preventDefault();
                    if(validarFormulario()==true){
                        var datax = $("#formAlimento").serializeArray();
                           $.each(datax, function(i, field){
                            console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                        });
                        $.ajax({
                            data: datax,    // En data se puede utilizar un objeto JSON, un array o un query string
                            type: "POST",   //Cambiar a type: POST si necesario
                            dataType: "json",  // Formato de datos que se espera en la respuesta
                            url: "http://localhost:8080/proyecto_final/controllers/controlleralimento.php",   // URL a la que se enviará la solicitud Ajax
                        })
                        .done(function( data, textStatus, jqXHR ) {
                            if ( console && console.log ) {
                                console.log( " data success : "+ data.success 
                                    + " \n data msg : "+ data.message 
                                    + " \n textStatus : " + textStatus
                                    + " \n jqXHR.status : " + jqXHR.status );
                            }
                            $('#myModal').modal('hide');
                            $('#myModalLittle').modal('show');
                            $('#myModalLittle').on('shown.bs.modal', function () {
                                var modal2 = $(this);
                                modal2.find('.modal-title').text('Mensaje del Servidor');
                                modal2.find('.msg').text(data.message);
                                $('#cerrarModalLittle').focus();                                
                            });
                            getlista();
                            deshabilitabotones();
                        })
                        .fail(function( jqXHR, textStatus, errorThrown ) {
                            if ( console && console.log ) {
                                console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                                    + " \n errorThrown : "+ errorThrown
                                    + " \n textStatus : " + textStatus
                                    + " \n jqXHR.status : " + jqXHR.status );
                            }
                        });                        
                    }
                });    
        $("#eliminar-alimento").click(function(e){
            e.preventDefault();
            var datax = $("#formDeleteAlimento").serializeArray();
                    /* .each(datax, function(i, field){
                        console.log("contenido del form = "+ field.name + ":" + field.value + " ");
                    });*/
                    $.ajax({
                        data: datax, 
                        type: "POST",
                        dataType: "json", 
                        url: "http://localhost:8080/proyecto_final/controllers/controlleralimento.php",
                    })
                    .done(function(data,textStatus,jqXHR ) {
                        if ( console && console.log ) {
                            console.log( " data success : "+ data.success 
                                + " \n data msg : "+ data.message 
                                + " \n textStatus : " + textStatus
                                + " \n jqXHR.status : " + jqXHR.status );
                        }
                        $('#myModalDelete').modal('hide');
                        $('#myModalLittle').modal('show');
                        $('#myModalLittle').on('shown.bs.modal', function () {
                            var modal2 = $(this);
                            modal2.find('.modal-title').text('Mensaje del Servidor');
                            modal2.find('.msg').text(data.message);
                            $('#cerrarModalLittle').focus();                                
                        });
                        getlista(); 
                    })
                    .fail(function( jqXHR, textStatus, errorThrown ) {
                        if ( console && console.log ) {
                            console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                                + " \n errorThrown : "+ errorThrown
                                + " \n textStatus : " + textStatus
                                + " \n jqXHR.status : " + jqXHR.status );
                        }
                    });
                });
        deshabilitabotones();                
        getlista();

    });
function veralimento(action, aliid){
    deshabilitabotones();
    var datay = {"aliId": aliid,
    "Accion":"obtener" };
    $.ajax({
        data: datay, 
        type: "POST",
        dataType: "json", 
        url: "http://localhost:8080/proyecto_final/controllers/controlleralimento.php", 
    })
    .done(function(data,textStatus,jqXHR ) {
        if ( console && console.log ) {
            console.log( " data success : "+ data.success 
                + " \n data msg : "+ data.message 
                + " \n textStatus : " + textStatus
                + " \n jqXHR.status : " + jqXHR.status );
        }
        $("#aliId").val(data.datos.id);
        $("#aliNombre").val(data.datos.nombre);
        $("#aliKilos").val(data.datos.kilos);
        $("#aliMarca").val(data.datos.marca);
        $("#aliDescri").val(data.datos.descri);
         

        deshabilitaform();
        $("#Accion").val(action);

        $('#myModal').on('shown.bs.modal', function () {
            var modal = $(this);
            if (action === 'actualizar'){
                modal.find('.modal-title-form').text('Actualizar Alimento');
                $('#guardar-alimento').hide();                    
                $('#actualizar-alimento').show();   
            }else if (action === 'ver'){
                modal.find('.modal-title-form').text('Ver Alimento');
                deshabilitabotones();
               $('#editar-alimento').show();   
            }

        });
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( " La solicitud ha fallado,  textStatus : " +  textStatus 
                + " \n errorThrown : "+ errorThrown
                + " \n textStatus : " + textStatus
                + " \n jqXHR.status : " + jqXHR.status );
        }
    });
}        
function deletealimento(idAlimento, nameAlimento){     
    document.formDeleteAlimento.aliId.value = idAlimento;
    document.formDeleteAlimento.nameAlimento.value = nameAlimento;
    document.formDeleteAlimento.Accion.value = "eliminar";
    $('#myModalDelete').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });
}  