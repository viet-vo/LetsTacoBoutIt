function render(data) {
    var html = "<div class='commentBox'><div class='rightPanel'><span>"+data.name+"</span><div class='date'>"+data.date+"</div><p>"+data.body+"</p></div><div class='clear'></div></div>";
    $('#container').append(html);
}



$(document).ready(function() {

    var comment = [
        {"name": "Daniel Voong", "date": "6 Sep, 2018", "body": "Hey guys! If you're in Irvine area try Fatty Tuna!"}
    ];

    for (var i=0; i<comment.length; i++) {
        render(comment[i]);
    }

    $('#addComment').click(function() {
        var addObj = {
            "name": $('#name').val(),
            "date": $('#date').val(),
            "body": $('#bodyText').val()
        };
        console.log(addObj);
        comment.push(addObj);
        render(addObj);
        $('#name').val(''),
        $('#date').val('dd/mm/yyyy'),
        $('#bodyText').val('');

   

    });

});