Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        windowBlock: {
            network: false,
            welcom: false,
            welcom: true,
            register: false,
            logim: false
        },
//        queryPointLogin: 'http://workprojectmobile/www/php/loginIn.php',
//        queryPointLogin: 'http://restaurant.atservers.net/php/loginIn.php',
        queryPointLogin: 'http://workproject/www/php/loginIn.php',
        dataLogin: {
            telephone: '',
            password: ''
        },
//        queryPointRegistr: 'http://restaurant.atservers.net/php/registrations.php',
        queryPointRegistr: 'http://workproject/www/php/registrations.php',
//        queryPointRegistr: 'http://d0008482.atservers.net/Felix/registrations.php',
        dataRegister: {
            name: '',
            lastName: '',
            telephone: '',
            password: ''
        },    
        dataAccount: {},
        snackMessage: ""
    },
    methods: {
        loginIn: function(){
            
            let validInp = validate(Account.dataLogin);
            
            
            if(validInp["Valid"]){

                this.$http.get(this.queryPointLogin,  { params: this.dataLogin } ).then(function(response){
                if(response.data != " " ){
                    this.dataAccount = JSON.parse(response.data);
                    Local.Set("Account",this.dataAccount);
        //                this.showSnackBar("Вход успешен");
                    window.location = "index.html";
                }else{
                    this.showSnackBar("Неверный телефон или пароль!");
                }    
                }, function (error) {
                    this.showSnackBar("Нет соединения");
                    console.log("Ошибка запроса: ");
                });
            }else{
                this.showSnackBar("Неверное поле: "+validInp[0]); 
            }
        },        
        registr: function(){
            let validInp = validate(Account.dataRegister);
            if(validInp["Valid"]){
                this.$http.get(this.queryPointRegistr,  { params: this.dataRegister } ).then(function(response){ });
            }else{
                this.showSnackBar("Неверное поле: "+validInp[0]); 
            }
        },
        showSnackBar(Message) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        networkCheck: function(networkStatus){
            //если подключение есть тогда показать приветствие
            this.windowBlock.network = networkStatus;
            if(this.windowBlock.network){
                this.windowBlock.welcom = true;
            }else{
                this.windowBlock.welcom = false;
            }

//            this.windowBlock.network = networkStatus;
//            console.log(this.windowBlock.network + "tools: "+networkStatus);
        },
        navigation: function(){
            if ( !isEmpty(Local.Get("Account")) ){
                window.location.href="index.html";
            }
        }
    },
    created: function () {
        this.navigation();
//       if(this.network = checkConnection() ){
//           this.welcom = true;
//       }else{
//           this.welcom = false;
//       }
    }
});