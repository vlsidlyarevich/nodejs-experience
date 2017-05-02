export default {

    onUserDelete(vm, id){
        vm.info = 'Deleted'
        setTimeout(function () {
            vm.info = '';
        }, 3000);
        for (var i = 0; i < vm.rows.length; i++) {
            if (id === vm.rows[i][0]) {
                vm.rowsCopy.splice(i, 1)
                vm.rows.splice(i, 1)
                vm.dtHandle.clear();
                vm.dtHandle.rows.add(vm.rows);
                vm.dtHandle.draw();
                //this.redrawTable(vm);
                vm.addStyles();
                break;
            }
        }
    },

    addStyles(vm){
        let context = this;

        $('select').addClass('selectpicker').attr('data-style', 'btn-primary');

        $('td.editable-title').attr('data-ok-button', 'OK').attr('data-cancel-button', 'Cancel').attr('data-type', "textarea");
        $('td.editable-subtitle').attr('data-ok-button', 'OK').attr('data-cancel-button', 'Cancel').attr('data-type', "textarea");
        $('td.editable-content').attr('data-ok-button', 'OK').attr('data-cancel-button', 'Cancel').attr('data-type', "textarea");
        $('td.editable-author').attr('data-ok-button', 'OK').attr('data-cancel-button', 'Cancel').attr('data-type', "textarea");

        $(document)
            .on('mousedown', ".jip-ok-button", (function () {
                var row = $(this).parent().parent().parent().parent().children().index($(this).parent().parent().parent());
                vm.rowNumber = row;
            }));



        $('td.editable-title').jinplace({
                submitFunction(ev, data) {
                    if (vm.rows[vm.rowNumber][1] !== data) {
                        alert(vm.rows[vm.rowNumber][1])
                        vm.rows[vm.rowNumber][1] = data
                        // vm.dtHandle.clear();
                        // vm.dtHandle.rows.add(vm.rows);
                        // vm.dtHandle.draw();
                        context.redrawTable(vm);
                        context.addStyles(vm);
                    }
                }
            }
        );

        $('td.editable-subtitle').jinplace({
                submitFunction(ev, data) {
                    if (vm.rows[vm.rowNumber][2] !== data) {
                        vm.rows[vm.rowNumber][2] = data;
                        // vm.dtHandle.clear();
                        // vm.dtHandle.rows.add(vm.rows);
                        // vm.dtHandle.draw();
                        context.redrawTable(vm);
                        context.addStyles(vm);
                    }
                }
            }
        );
        $('td.editable-content').jinplace({
            submitFunction(ev, data) {
                if (vm.rows[vm.rowNumber][3] !== data) {
                    vm.rows[vm.rowNumber][3] = data
                    // vm.dtHandle.clear();
                    // vm.dtHandle.rows.add(vm.rows);
                    // vm.dtHandle.draw();
                    context.redrawTable(vm);
                    context.addStyles(vm);
                }
            }
        });
        $('td.editable-author').jinplace({
            submitFunction(ev, data) {
                if (vm.rows[vm.rowNumber][4] !== data) {
                    vm.rows[vm.rowNumber][4] = data
                    // vm.dtHandle.clear();
                    // vm.dtHandle.rows.add(vm.rows);
                    // vm.dtHandle.draw();
                    context.redrawTable(vm);
                    context.addStyles(vm);
                }
            }
        });

        $('.edit-btn').click(function () {
            var clickedBtnID = $(this).attr('id');
            var users = vm.getUserById(clickedBtnID);
            var user = users[0];
            var userCopy = users[1];
            for (var i = 0; i < userCopy.length; i++) {
                if (userCopy[i] != user[i + 1]) {
                    vm.user.id = user[0];
                    vm.user.title = user[1];
                    vm.user.subtitle = user[2];
                    vm.user.content = user[3];
                    vm.user.author = user[4];
                    vm.editItem(vm.user)
                    break;
                }
            }
        });

        $('.delete-btn').click(function () {
            var clickedBtnID = $(this).attr('id');
            var users = vm.getUserById(clickedBtnID);
            vm.deleteItem(users[0][0]);
        });
    },
    redrawTable(vm){
        vm.dtHandle.clear();
        vm.dtHandle.rows.add(vm.rows);
        vm.dtHandle.draw();
    }
}
