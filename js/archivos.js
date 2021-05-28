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
     
        if(peticionHttp.readyState==4 && peticionHttp.status==200)
        { 
            $("load").hidden=true;
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
    id1 = fila.childNodes[0].childNodes[0];
    cuadro=$("cargar");
    cuadro.hidden=false;
    
    var txtNom;
    var txtCu;
    var dateFecha;
    var radioTur;
    
    txtNom=fila.cells[1].innerHTML;
    $("txtNombre").value=txtNom;
 
    

    dateFecha=fila.cells[3].innerHTML;
    var array = dateFecha.split("/");
    $("dteFecha").value = array[2] + "-" + array[1] + "-" + array[0];
    
    txtCu=fila.cells[2].innerHTML;
    if(txtCu==1)
    {
        $("txtCuatrimestre").options[0].selected=true;
    }
    if (txtCu==2) {
        $("txtCuatrimestre").options[1].selected=true;
    } 
    if(txtCu==3)
    {
        $("txtCuatrimestre").options[2].selected=true;
    }
    if(txtCu==4)
    {
        $("txtCuatrimestre").options[3].selected=true;
    }
    $("txtCuatrimestre").disabled=true;
    radioTur=txtNom=fila.cells[4].innerHTML;
    if(radioTur=="Noche")
    {
        
        $("tn").checked=true;
    }
    else
    {
        $("tm").checked=true;
    }

    var mod=$("yes");
    var del=$("no");







    mod.onclick=function()
    {
        var nombre=$("txtNombre").value;

        var cuatri=$("txtCuatrimestre").value;
        var id = fila.childNodes[0].innerHTML;
        var fecha=$("dteFecha").value;
        var turno;
        var bool=false;
    
    
        const hoy = Date.now();
        const today = new Date(hoy);
    
        var fechaType=Date.parse(fecha);
        const dateIso = new Date(fechaType);

        if(nombre.length>=6 && dateIso.getTime()>=today.getTime())
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
            var array = fecha.split("-");
            fecha = array[2] + "/" + array[1] + "/" + array[0];

            peticionHttp.onreadystatechange=function()
            {
                var personaJson={"id":id,"nombre":nombre,"cuatrimestre":cuatri,"fechaFinal":fecha,"turno":turno};

                stringPersona=JSON.stringify(personaJson); 
                if(peticionHttp.status == 200 && peticionHttp.readyState == 4)
                {
                    
                    $("load").style.display = "none";
                    close();
                    fila.childNodes[1].innerHTML=nombre;
                    fila.childNodes[2].innerHTML=cuatri;
                    fila.childNodes[3].innerHTML=fecha;
                    fila.childNodes[4].innerHTML=turno;
                    fila.childNodes[0].innerHTML=id; 
                }
    
                
            }
                $("load").style.display = "flex";
                peticionHttp.open("POST","http://localhost:3000/editar",true);
                peticionHttp.setRequestHeader("Content-type","application/json");
                peticionHttp.send(stringPersona);
        }       
    }




    del.onclick=function()
    {
        var delId=fila.childNodes[0].innerHTML;
        var personaJson={"id":delId};
        stringPersona=JSON.stringify(personaJson); 
        peticionHttp.onreadystatechange=function()
        {
            if(peticionHttp.status == 200 && peticionHttp.readyState == 4)
            {
                $("load").style.display = "none";
                close();
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
            }           

        }
        $("load").style.display = "flex";
        peticionHttp.open("POST","http://localhost:3000/eliminar",true);
        peticionHttp.setRequestHeader("Content-type","application/json");
        peticionHttp.send(stringPersona);
    }
}

