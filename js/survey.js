// 下一题
$(document).on('click', '#j_questionNext', ()=>{
  let isAnyChecked = false;
  $('.question__radio').each((index, item)=>{
    if ($(item).is(':checked')) {
      isAnyChecked = true;
    }
  });
  if (!isAnyChecked) {
    alert('请选择选项');
  } else {
    location.assign('../survey_last.html');
  }
});
// 提交弹窗
$(document).on('click', '#j_questionSubmit', ()=>{
  let isAnyChecked = false;
  $('.question__checkbox').each((index, item)=>{
    if ($(item).is(':checked')) {
      isAnyChecked = true;
    }
  });
  if (!isAnyChecked) {
    alert('请选择选项');
  } else {
    $('#j_actDialog').removeClass('hidden').addClass('show');
  }
});