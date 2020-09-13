// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
  var Datos=["","",""],validar=0, clave="Prueba123";
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: false,
    userName: "patriciabonilla1995@gmail.com",
    password: "1726646654",
    onSuccess:onConnect,
    onFailure:doFail
    
  }
  
  // connect the client
  client.connect(options);
    
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
    client.subscribe("patriciabonilla1995@gmail.com/test");
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    
    console.log(message.payloadString);
    Datos=(message.payloadString).split(("-"));
    if(Datos[0]=="Led"&&validar==1){
      Data=[Datos[1],Datos[2]];
      MisDAtos(Data);
    }
    if(Datos[0]=="Datos"){
      var tres=document.getElementById("Historial");
      tres.innerHTML=String(Datos[1]);
    }
    
  }

  function MisDAtos(texto){
    var uno=document.getElementById("LED_1");
    var dos=document.getElementById("LED_2");
    
    uno.innerHTML=" Se encuentra "+texto[0];
    dos.innerHTML="Se encuentra "+texto[1];
  }
  
  function MostarClave(){
    var acs = document.getElementById("pass").value;
    if(acs==clave){
      console.log("access");
      validar=1;
    }else{
      alert("Clave Incorrecta")
      validar=0;
    }
    
    
  }
  function ChangePass(){
    document.getElementById('NewPass').style.display = 'block';
    document.getElementById('passV').style.display = 'block';
    document.getElementById('passA').style.display = 'block';
  }
  function ActuPass(){
    PasAc=document.getElementById("passV");
    PasNew=document.getElementById("passA");
    if(PasAc.value==clave){
      clave=PasNew.value;
      ocultar();
    }else{
      alert("La Clave actual no Coincide");
    }
  }

  function MostarDatos(){
    mensaje("0");
  }
  function mensaje(text){
    message = new Paho.MQTT.Message(text);
    message.destinationName = "patriciabonilla1995@gmail.com/test1";
    client.send(message);
  }
  function ocultar(){
    document.getElementById('NewPass').style.display = 'none';
    document.getElementById('passV').style.display = 'none';
    document.getElementById('passA').style.display = 'none';
  }

  window.onload = function() {
    ocultar();
  }