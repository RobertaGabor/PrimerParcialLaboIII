var peticionHttp= new XMLHttpRequest();
var listaPersonas;
var id1;
var fila;
window.addEventListener('load',function()
{
    TraerPersonas();
    var x=$("close");
    x.addEventListener("click",close);



});

// var peticionHttp= new XMLHttpRequest();
// window.onload = function() {
//     TraerPersonas();
// };
function close()
{
    cuadro=$("cargar");
    cuadro.hidden=true;
}
function $(id)
{
    return document.getElementById(id);
}

function TraerPersonas()
{

    peticionHttp.onreadystatechange=function(){
        $("loader").hidden=false;
        $("loader2").hidden=false;
        if(peticionHttp.readyState==4 && peticionHttp.status==200)
        { 
            $("loader").hidden=true;
            $("loader2").hidden=true;
            listaPersonas= JSON.parse(peticionHttp.responseText);
            var bool=true;
            for(var i=0;i<listaPersonas.length;i++)
            {

                //console.log(listaPersonas[i].nombre,listaPersonas[i].apellido);
                /*       DOM        */
                var cuerpo=$("tcuerpo");
                var row= document.createElement("tr");               
                cuerpo.appendChild(row);
                
                var tdId=document.createElement("td");
                row.appendChild(tdId);
                var textoId=document.createTextNode(listaPersonas[i].id);
                tdId.appendChild(textoId);
 

                var tdNombre=document.createElement("td");
                row.appendChild(tdNombre);
                var textoNombre=document.createTextNode(listaPersonas[i].nombre);
                tdNombre.appendChild(textoNombre);
                
                var tdApellido=document.createElement("td");
                row.appendChild(tdApellido);
                var textoApellido=document.createTextNode(listaPersonas[i].cuatrimestre);
                tdApellido.appendChild(textoApellido);

                var tdFecha=document.createElement("td");
                row.appendChild(tdFecha);
                var textoFecha=document.createTextNode(listaPersonas[i].fechaFinal);
                tdFecha.appendChild(textoFecha);

                var tdSexo=document.createElement("td");
                row.appendChild(tdSexo);
                var textoSexo=document.createTextNode(listaPersonas[i].turno);
                tdSexo.appendChild(textoSexo);

                if(bool==true)
                {
                    row.className="td1";
                }
                else
                {
                    row.className="td2";
                }
                bool=!bool;
                row.addEventListener("dblclick",modificar);
            }
        }
        
    }
    peticionHttp.open("GET","http://localhost:3000/materias",true);
    peticionHttp.send();  
}

function modificar(event)
{
    fila=event.target.parentNode;
    id1 = fila.childNodes[0].childNodes[0].nodeValue;
    cuadro=$("cargar")
    cuadro.hidden=false;
    
    var txtNom;
    var txtCu;
    var dateFecha;
    var radioTur;
    var elemento=event.target;
    
    txtNom=(elemento.parentNode).cells[1].innerHTML;
    $("txtNombre").value=txtNom;
    

    dateFecha=(elemento.parentNode).cells[3].innerHTML;
    var array = dateFecha.split("/");
    $("dteFecha").value = array[2] + "-" + array[1] + "-" + array[0];
    
    txtCu=(elemento.parentNode).cells[2].innerHTML;
    if(txtCu=="1")
    {
        $("txtCuatrimestre").options[4].selected=true;
        $("txtCuatrimestre").options[4].disabled=true;
    }
    if (txtCu=="2") {
        $("txtCuatrimestre").options[3].selected=true;
        $("txtCuatrimestre").options[3].disabled=true;
    } 
    if(txtCu=="3")
    {
        $("txtCuatrimestre").options[2].selected=true;
        $("txtCuatrimestre").options[2].disabled=true;
    }
    else{
        $("txtCuatrimestre").options[1].selected=true;
        $("txtCuatrimestre").options[1].disabled=true;
    }
    $("txtCuatrimestre").disabled=true;
    radioTur=txtNom=(elemento.parentNode).cells[4].innerHTML;
    if(radioTur=="Noche")
    {
        
        $("tn").checked=true;
    }
    else
    {
        $("tm").checked=true;
    }

    var change=$("yes");
    change.addEventListener("click",enviarPersonas);

    var y=$("no");
    y.addEventListener("click",deletePerso);
}




function deletePerso(event)
{
    var fila=event.target.parentNode.parentNode;
    var nombre=$("txtNombre").value;

    var cuatri=$("txtCuatrimestre").value;

    var fecha=$("dteFecha").value;
    var turno;

        if($("tm").checked==true)
        {
            turno="Mañana";
            bool=true;

        }
        else
        {
            turno="Noche";
            bool=true;
        }
    

        var stringPersona;

        peticionHttp.onreadystatechange=function(){
            var personaJson={"id":id1,"nombre":nombre,"cuatrimestre":cuatri,"fechaFinal":fecha,"turno":turno};
            // alert(nombre + " " + apellido + " " + fecha + " " + sexo);
            stringPersona=JSON.stringify(personaJson); 
            if(peticion.status == 200 && peticion.readyState == 4)
            {
                //elimina de pagina pero no tira ok
            }

            
        }
            peticionHttp.open("POST","http://localhost:3000/eliminar",true);
            peticionHttp.setRequestHeader("Content-type","application/json");
            peticionHttp.send(stringPersona);
            

    
}


function enviarPersonas(event)
{
    var fila=event.target.parentNode.parentNode.parentNode;
    var nombre=$("txtNombre").value;

    var cuatri=$("txtCuatrimestre").value;

    var fecha=$("dteFecha").value;
    var turno;
    var bool=false;


    const hoy = Date.now();
    const today = new Date(hoy);

    var fechaType=Date.parse(fecha);
    const dateIso = new Date(fechaType);

    // alert(dateIso.toISOString());
    // alert(today.toISOString());

    if(nombre.length>=6 && dateIso.getTime()<=today.getTime())
    {
        if($("tm").checked==true)
        {
            turno="Mañana";
            bool=true;

        }
        else
        {
            turno="Noche";
            bool=true;
        }
    }

    if(bool==true)
    {
        var stringPersona;

        peticionHttp.onreadystatechange=function(){
            var array = fecha.split("-");
            fecha = array[2] + "/" + array[1] + "/" + array[0];
            var personaJson={"id":id1,"nombre":nombre,"cuatrimestre":cuatri,"fechaFinal":fecha,"turno":turno};
            // alert(nombre + " " + apellido + " " + fecha + " " + sexo);
            stringPersona=JSON.stringify(personaJson); 
            if(peticion.status == 200 && peticion.readyState == 4)
            {

                fila.childNodes[0].childNodes[0].nodeValue=id1;
                fila.childNodes[1].childNodes[0].nodeValue=nombre;
                fila.childNodes[2].childNodes[0].nodeValue=cuatrimestre;
                 //guarda mal la fecha lo demas ok
                fila.childNodes[3].childNodes[0].nodeValue=fecha;
                fila.childNodes[4].childNodes[0].nodeValue=turno; 

            }

            
        }
            peticionHttp.open("POST","http://localhost:3000/editar",true);
            peticionHttp.setRequestHeader("Content-type","application/json");
            peticionHttp.send(stringPersona);
            

    }
    

}
