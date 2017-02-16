var app = new Vue({
    el: '#app',
    data:{
        books: [],
        mySearch: '',
        coluna: 'id',
        ordenacao: '1',
        pagination: {
            maxPage: 4,
            current: 1,
            totalItens: 0,
            totalPages: 0,
            listPagination: []
        }
    },
    methods:{
        orderColuna: function (e, coluna) {
            e.preventDefault();

            this.coluna = coluna;
            this.ordenacao = this.ordenacao * -1;
        },
        previous: function (e) {

            e.preventDefault();

            console.log( 'maxpage : ' +this.pagination.maxPage )
            console.log( 'current : ' + this.pagination.current )
            console.log( 'totalItens : ' +this.pagination.totalItens )
            console.log( 'totalPages : ' +this.pagination.totalPages )

            if(this.pagination.current === 1){
                return false;
            }

            this.pagination.current = this.pagination.current - 1;

            this.books = this.pagination.listPagination[this.pagination.current - 1];

        },
        pagePagination: function (e, current) {

            e.preventDefault();

            this.pagination.current = current + 1;

            this.books = this.pagination.listPagination[current];

        },
        next: function (e) {

            e.preventDefault();

            console.log( 'maxpage : ' +this.pagination.maxPage )
            console.log( 'current : ' + this.pagination.current )
            console.log( 'totalItens : ' +this.pagination.totalItens )
            console.log( 'totalPages : ' +this.pagination.totalPages )


            if(this.pagination.current === this.pagination.totalPages){
                return false;
            }

            this.pagination.current = this.pagination.current + 1;

            this.books = this.pagination.listPagination[this.pagination.current - 1];

        }
    },
    ready: function () {
        var self = this;

        self.$http.get('dataServer.json').then(function (response) {

            //total de itens
            self.pagination.totalItens = response.data.length;
            //total de paginas = totalItens / maxPage e arredondado para cima, ou seja 1,444 = 2
            self.pagination.totalPages = Math.ceil(self.pagination.totalItens / self.pagination.maxPage);

            var aux = [];

            for(var k in response.data){
                aux.push(response.data[k]);

                if(aux.length === self.pagination.maxPage){
                    self.pagination.listPagination.push(aux);

                    aux = [];
                }
            }

            if(aux.length > 0){
                self.pagination.listPagination.push(aux);
            }

            self.books = self.pagination.listPagination[0];

        })

    }
});