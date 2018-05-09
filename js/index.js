$(window).on('scroll', ()=>{
  $('.act').css({
    'opacity': '0'
  });
  setTimeout(()=>{
    location.assign('../survey.html');
  }, 1000);
});