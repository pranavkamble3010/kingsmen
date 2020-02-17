const config =  {

    backendIp :"35.184.221.240",
    backendPort:"1880",
    getUrl : function(){ return 'http://'+this.backendIp+':'+this.backendPort}
}


module.exports = config;