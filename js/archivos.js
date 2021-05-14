var peticionHttp= new XMLHttpRequest();
var id1;
window.addEventListener('load',function()
{
    TraerPersonas();
    var x=$("close");
    x.addEventListener("click",close);
    var change=$("yes");
    change.addEventListener("click",enviarPersonas);
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
        
        if(peticionHttp.readyState==4 && peticionHttp.status==200)
        { 
            var listaPersonas= JSON.parse(peticionHttp.responseText);
            var bool=true;
            for(var i=0;i<listaPersonas.length;i++)
            {
                id1=listaPersonas[i].id;
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
    cuadro=$("cargar")
    cuadro.hidden=false;
    
    var txtNom;
    var txtApe;
    var dateFecha;
    var radioSexo;
    var elemento=event.target;
    
    txtNom=(elemento.parentNode).cells[0].innerHTML;
    $("txtNombre").value=txtNom;
    txtApe=(elemento.parentNode).cells[1].innerHTML;
    $("txtApellido").value=txtApe;
    dateFecha=(elemento.parentNode).cells[2].innerHTML;
    $("dteFecha").value=dateFecha;
 
    radioSexo=txtNom=(elemento.parentNode).cells[3].innerHTML;
    if(radioSexo=="Female")
    {
        $("sxf").checked=true;
    }
    else
    {
        $("sxm").checked=true;
    }
}

function enviarPersonas()
{
    var nombre=$("txtNombre").value;
    var apellido=$("txtApellido").value;
    var fecha=$("dteFecha").value;
    var sexo;
    var bool=false;

    const hoy = Date.now();
    const today = new Date(hoy);

    var fechaType=Date.parse(fecha);
    const dateIso = new Date(fechaType);

    // alert(dateIso.toISOString());
    // alert(today.toISOString());

    if(nombre.length>3 && apellido.length>3 && dateIso.getTime()<=today.getTime())
    {
        if($("sxf").checked==true)
        {
            sexo="Female";
            bool=true;

        }
        else
        {
            sexo="Male";
            bool=true;
        }
    }

    if(bool==true)
    {
        var stringPersona;
        peticionHttp.onreadystatechange=function(){
            var personaJson={"id":id1,"nombre":nombre,"apellido":apellido,"fecha":fecha,"sexo":sexo};
            // alert(nombre + " " + apellido + " " + fecha + " " + sexo);
            stringPersona=JSON.stringify(personaJson); 
            
        }
            peticionHttp.open("POST","http://localhost:3000/editar",true);
            peticionHttp.setRequestHeader("Content-type","application/json");
            peticionHttp.send(stringPersona); 
    }
    

}
