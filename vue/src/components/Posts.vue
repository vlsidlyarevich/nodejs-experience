<template>
    <div class="alert alert-danger table-alert" v-if="error">
        <p>{{ error }}</p>
    </div>
    <div class="alert alert-info table-alert" v-if="info">
        <p>{{ info }}</p>
    </div>
    <table id="table-id" class="display nowrap dataTable dtr-inline">
    </table>
</template>

<script>
    import auth from '../auth'
    import user from '../user'
    import adminTable from '../admin/adminTable'

    export default {
        template: '<button class="btn btn-success" @click.prevent="editItem(item)">Edit</button>',
        props: ['tableData'],
        data() {
            return {
                headers: [
                    {title: 'Id', class: 'odd-table-element'},
                    {title: 'Email', class: 'even-table-element editable-email'},
                    {title: 'Password', class: 'odd-table-element editable-password'},
                    {title: 'Roles', class: 'even-table-element editable-roles'},
                    {title: 'Actions', class: 'odd-table-element'}
                ],
                rows: [],
                rowsCopy: [],
                dtHandle: [],
                user: {
                    id: '',
                    username: '',
                    password: '',
                    authorities: ''
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

                    rowCopy.push(item.username);
                    rowCopy.push(item.password);
                    rowCopy.push(item.authorities);

                    row.push(item.id);
                    row.push(item.username);
                    row.push(item.password);
                    row.push(item.authorities);
                    row.push('<button class="btn btn-success edit-btn" id="' + item.id + '">Edit</button>' +
                        '<button class="btn btn-danger delete-btn" id="' + item.id + '">Delete</button>')

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
                user.updateUser(this, item)
                    .then(result => {
                            vm.info = 'Updated'
                            setTimeout(function () {
                                vm.info = '';
                            }, 3000);
                            for (var i = 0; i < vm.rows.length; i++) {
                                if (item.id === vm.rows[i][0]) {
                                    vm.rowsCopy[i][0] = item.username;
                                    vm.rowsCopy[i][1] = item.password;
                                    vm.rowsCopy[i][2] = item.authorities;
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
                            user.deleteUser(vm, id)
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
            user.getUsers(this)
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
