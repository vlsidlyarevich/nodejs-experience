<template>
    <div class="alert alert-danger table-alert" v-if="error">
        <p>{{ error }}</p>
    </div>
    <div class="alert alert-info table-alert" v-if="info">
        <p>{{ info }}</p>
    </div>
    <table id="table-id" class="display  dataTable dtr-inline">
    </table>
</template>

<script>
    import auth from '../auth'
    import user from '../user'
    import post from '../post'
    import adminTable from '../admin/adminTable'

    export default {
        template: '<button class="btn btn-success" @click.prevent="editItem(item)">Edit</button>',
        props: ['tableData'],
        data() {
            return {
                headers: [
                    {title: 'Id', class: 'odd-table-element'},
                    {title: 'Title', class: 'even-table-element editable-title'},
                    {title: 'Subtitle', class: 'odd-table-element editable-subtitle'},
                    {title: 'Content', class: 'even-table-element editable-content'},
                    {title: 'Author', class: 'odd-table-element editable-author'},
                    {title: 'Actions', class: 'even-table-element'}
                ],
                rows: [],
                rowsCopy: [],
                dtHandle: [],
                user: {
                    id: '',
                    title: '',
                    subtitle: '',
                    content: '',
                    author: '',
                },
                error: '',
                info: '',
                rowNumber: ''
            }
        },
        methods: {
            tableData(val, oldVal) {
                let vm = this;
                val.forEach(function (item) {
                    let row = [];
                    let rowCopy = [];

                    rowCopy.push(item.title);
                    rowCopy.push(item.subtitle);
                    rowCopy.push(item.content);
                    rowCopy.push(item.author);


                    row.push(item._id);
                    row.push(item.title);
                    row.push(item.subtitle);
                    row.push(item.content);
                    row.push(item.author);
                    row.push('<button class="btn btn-success edit-btn" id="' + item._id + '">Edit</button>' +
                        '<button class="btn btn-danger delete-btn" id="' + item._id + '">Delete</button>')

                    vm.rows.push(row);
                    vm.rowsCopy.push(rowCopy)
                });
                adminTable.redrawTable(this)
            },
            initialize(){
                this.dtHandle = $('#table-id').DataTable({
                    columns: this.headers,
                    data: this.rows

                });
            },
            editItem(item){
                let vm = this;
                post.updateUser(this, item)
                    .then(result => {
                            vm.info = 'Updated'
                            setTimeout(function () {
                                vm.info = '';
                            }, 3000);
                            for (var i = 0; i < vm.rows.length; i++) {
                                if (item._id === vm.rows[i][0]) {
                                    vm.rowsCopy[i][0] = item.title;
                                    vm.rowsCopy[i][1] = item.subtitle;
                                    vm.rowsCopy[i][2] = item.content;
                                    vm.rowsCopy[i][3] = item.author;
                                    break;
                                }
                            }
                        },
                        error => {
                            this.error = error.data;
                            setTimeout(function () {
                                vm.error = '';
                            }, 10000);
                        })
            },
            deleteItem(id){
                var vm = this;
                bootbox.confirm({
                    message: "Do you really want to delete this account?",
                    size: "small",
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            post.deleteUser(vm, id)
                                .then(result => {
                                        vm.info = 'Deleted'
                                        setTimeout(function () {
                                            vm.info = '';
                                        }, 3000);
                                        for (var i = 0; i < vm.rows.length; i++) {
                                            if (id === vm.rows[i][0]) {
                                                vm.rowsCopy.splice(i, 1)
                                                vm.rows.splice(i, 1)
                                                adminTable.redrawTable(vm)
                                                vm.addStyles();
                                                break;
                                            }
                                        }
                                    },
                                    error => {
                                        this.error = error;
                                    }
                                );
                        }
                    }.bind(this)
                });

            },
            getUserById(userId){
                for (var i = 0; i < this.rows.length; i++) {
                    var row = this.rows[i]
                    if (userId === row[0]) {
                        return [row, this.rowsCopy[i]];
                    }
                }
            }
        },
        ready() {
            this.initialize();
            let vm = this;
            post.getUsers(this)
                .then(result => {
                        this.tableData(result.data, null);
                        adminTable.addStyles(vm)
                    },
                    error => {
                        this.error = error;
                    }
                );
        },

    }
</script>
