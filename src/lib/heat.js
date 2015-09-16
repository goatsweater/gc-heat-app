/*
HEAT Survey Controller
*/

var HEAT = {
  survey: {
    currentStep: 1,
    // Hide the current step panel and show the next one
    nextStep: function() {
      step = HEAT.survey.currentStep;
      $('#step' + step).addClass('hidden');
      step += 1;
      $('#step' + step).removeClass('hidden');
      HEAT.survey.currentStep = step;
    },
  }
}

// Settings page storage and loading
$(document).ready(function () {
  if (window.location.href.indexOf("settings") > -1)
  {
    // load values from local storage
    var userage = parseInt(localStorage['settings.userage']);
    $('#userage').val(userage);
    var tracklvl = localStorage['settings.tracklvl'];
    if (tracklvl == 0) {
      $("#tracklvl1").prop('checked', true);
    } else if (tracklvl == 1) {
      $("#tracklvl2").prop('checked', true);
    }

    // save on value change
    $('#userage').blur(function() {
      localStorage['settings.userage'] = $('#userage').val();
    });
    $("input[type='radio'][name='tracklvl']").change(function() {
      localStorage['settings.tracklvl'] = $("input[type='radio'][name='tracklvl']:checked").val();
      $(this).blur();
    });
  }
});
