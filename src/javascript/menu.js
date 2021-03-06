/**
 * Created by sogo on 16/09/2017.
 */
var contents_height = []

$(document).ready(function(){
    // 콘텐츠 높이 확인하고 contents_height에 모두 삽입
    var contents_array = $('.content');
    contents_array.each(function(){
       contents_height.push($(this).position().top);
    });
    // 첫 로딩시 위치 확인
    var i = checkMenuPostion();
    $('#navigation_text').text(contents_array[i].attributes['name'].value);

    // 스크롤이 일어났다면
    $(window).scroll(function() {
        var i = checkMenuPostion();
        $('#navigation_text').text(contents_array[i].attributes['name'].value);
    });
});

function checkMenuPostion() {
    // 현재 스크롤과 컨텐츠 위치 비교
    var height = $(window).scrollTop();
    for (var i = contents_height.length-1; i >= 0; i--) {
        if (height < contents_height[0]) {
            i = -1;
            break;
        }
        if (height >= contents_height[i]) {
            break;
        }
    }
    // 정리
    if (i+1 == contents_height.length) {
        return i;
    }
    else {
        return i+1;
    }
}

function menuButtonClicked(position) {
    if (position == 'left') {
        var i = checkMenuPostion()
        if (i != 0) {
            i -= 1;
            console.log(i);
            var content = $('#content' + i).position();
            $('html, body').animate({scrollTop: content.top-$('#top').height()}, 500)
        }
    }
    else if (position == 'right') {
        var i = checkMenuPostion()
        if (i + 1 != contents_height.length) {
            i += 1;
            console.log(i);
            var content = $('#content' + i).offset();
            $('html, body').animate({scrollTop: content.top-$('#top').height()}, 500)
        }
    }
    else {
        alert('error');
    }
}