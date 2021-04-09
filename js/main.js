function init() {
    new Vue({
        el:"#app",

        data:{
            "chevron": false,
            'searchedName': "",
            'myText': "",
            'newMessage':{text:'', status:'sent', time:'', menu:false, chevron:false},
            'newAnswer':{text:'va bene!', status:'received', time:'', menu:false, chevron:false},
            'activeContact': false,
            'contactsArray': [

                        {
                            name: 'Nunzio o Scienzato',
                    avatar: 'nunzio',
                    visible: true,
                    messages: [
                        {
                            date: '10/04/2021',
                            time: '13:55',
                            text: 'Bella bionda tutto bene? ',
                            status: 'received'
                        },
                        {
                            date: '10/04/2020',
                            time: '13:50:00',
                            text: 'vieni su lol, vieni !',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020',
                            time: '14:15:22',
                            text: 'A chicco gia cè sto!',
                            status: 'sent'
                        },
                        {
                            date: '11/04/2020',
                            time: '14:15:22',
                            text: 'grandeeeeee!',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'AmoMi',
                    avatar: 'ersa',
                    visible: true,
                    messages: [
                        {
                            date: '11/04/2020',
                            time: '12:30:00',
                            text: 'Ciao amo come stai?',
                            status: 'sent'
                        },
                        {
                            date: '11/04/2020',
                            time: '12:30:55',
                            text: "Bene grazie! te?",
                            status: 'received'
                        },
                        {
                            date: '11/04/2020',
                            time: '12:35:00',
                            text: 'Bene bene stassera andiamo a mangiare da mia madre?',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Mirko sminkia',
                    avatar: 'mirko',
                    visible: true,
                    messages: [
                        {
                            date: '11/04/2020',
                            time: '10:10:40',
                            text: 'A Raul quando me enviti a fa la brace?',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '11:50:10',
                            text: 'A chicco quando te pare!',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020',
                            time: '11:15:22',
                            text: 'bella pe te!',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'vlad',
                    avatar: 'vlad',
                    visible: true,
                    messages: [
                        {
                            date: '11/04/2020',
                            time: '10:30:55',
                            text: 'vieni a giocare? ci manca il quarto?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '10:50:00',
                            text: 'arrivo!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Mamma',
                    avatar: 'mamma',
                    visible: true,
                    messages: [
                        {
                            date: '11/04/2020',
                            time: '10:10:40',
                            text: 'Venite a mangiare stassera?',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '10:20:10',
                            text: 'chiedo',
                            status: 'sent'
                        },
                    ],
                },
            ]
        },
        updated() {
            if (this.activeContact) {
                const container = this.$el.querySelector("#chat");
                container.scrollTop = container.scrollHeight;
            }
        },

        mounted: function () {
                    for (let i = 0; i < this.contactsArray.length; i++) {
                        const contact=this.contactsArray[i];
                        for (let x = 0; x < contact.messages.length; x++) {
                            const message=contact.messages[x];
                            Vue.set(message, 'menu', false);
                            Vue.set(message, 'chevron', false);
                        }
                    };
                    console.log(this.contactsArray);
        },
        methods:{
            getContact: function (index) {
                this.activeContact=this.contactsArray[index];
                this.$nextTick(() => this.$refs.newMsg.focus());
            },

            plusZero: function(timeNum) {
              if (timeNum  < 10) {
                  timeNum = '0' + timeNum;
              }
              return timeNum
            },

            getTime: function () {
                const today = new Date();
                const time = this.plusZero(today.getHours()) + ":" + this.plusZero(today.getMinutes()) + ":" + this.plusZero(today.getSeconds());
                return time;
            },

            sendText: function () {
                const time = this.getTime();
                const active = this.activeContact;
                this.newMessage["text"] = this.myText;
                this.newMessage["time"] = time;
                this.activeContact.messages.push({...this.newMessage});
                this.myText="";
                this.answer(active);
            },

            answer: function (active) {
                setTimeout(() =>{
                    const time = this.getTime();
                    this.newAnswer["time"] = time;
                    active.messages.push({...this.newAnswer});
                },1000);
            },

            filteredContactsArray: function () {
                return this.contactsArray.filter(contact => {
                   return contact.name.toUpperCase().includes(this.searchedName.toUpperCase());
               });
           },

           toggleMenu: function (message) {
                   message.menu=!message.menu;
            },

           closeMenu: function () {
                this.activeContact.messages.forEach(elem => {
                    if (elem.menu) {
                        elem.menu = false;
                    }
                });
            },

            deleteMsg: function (ind) {
                this.activeContact.messages.splice(ind, 1);
            },

            showChevron:function (message) {
                message.chevron = true;
            },

            hideChevron:function (message) {
                message.chevron = false;
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
