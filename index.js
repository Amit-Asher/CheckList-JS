let records = []

// test

function markAll() {
    $.each($(".markable"), (_, checkbox) => {
        checkbox.checked = true;
    });
}

function unMarkAll() {
    $.each($(".markable"), (_, checkbox) => {
        checkbox.checked = false;
    });
}

function deleteRecords() {
    $.each($(".markable"), (_, checkbox) => {
        if (checkbox.checked) {
            records = records.filter(elm => elm["id"] != checkbox.parentElement["id"]);
            checkbox.parentElement.remove();
        }
    });
}

// encapsulation with closures ?
let addNewRecord = (() => {

    let idSupplier = 0;

    function buildNewRecord(title, description) {
        idSupplier = idSupplier + 1;
        return '<label class="list-group-item d-flex gap-2" id=' + idSupplier + '>' +
            '<input class="form-check-input flex-shrink-0 markable" type="checkbox" value=""/>' +
            '<span>' + title + '<small class="d-block text-muted">' + description + '</small>' + '</span>' +
            '</label>';
    }

    function cleanInputsControls() {
        $("#new-checklist-title").val("");
        $("#new-checklist-description").val("");
    }

    return () => {
        let title = $("#new-checklist-title").val();
        let description = $("#new-checklist-description").val();
        $("#records").prepend(buildNewRecord(title, description));
        records.push({"id":idSupplier, "title":title, "description":description});
        cleanInputsControls();   
    }
})();