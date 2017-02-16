var app = new Vue({
    el: '#app',
    data:{
        hello : 'My Books',
        pessoas : [
            'Lucas',
            'Isabel',
            'Vinicius',
            'Familia Borges'
        ],
        novoElemento: '',
        elementos: [],
        myForm: {
            name: '',
            email: ''
        },
        myListForm: []

    },
    methods:{

        addElemento: function () {

            var title = this.novoElemento.trim();

            if(title){
                this.elementos.push(title);
                this.novoElemento = '';
            }

        },
        removeElemento: function (e, index) {
            e.preventDefault();

            this.elementos.splice(index, 1);
        },
        addListForm: function () {

            if(this.myForm.name && this.myForm.email){

                this.myListForm.push({name: this.myForm.name, email: this.myForm.email})

                this.myForm.name = '';
                this.myForm.email = '';

            }else{
                alert('Nome ou email não foi preenchido')
            }
        }

        ,
        removeListForm: function (e, index) {

            e.preventDefault();

            this.myListForm.splice(index, 1)

        }

    },


});