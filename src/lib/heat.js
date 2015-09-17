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
      // Skip step 2 if you've already filled it out
      if (step == 2 && HEAT.survey.userInfoDefined()) {
        step += 1;
      }
      $('#step' + step).removeClass('hidden');
      HEAT.survey.currentStep = step;
    },
    userInfoDefined: function () {
      var usersex = localStorage["settings.usersex"];
      console.log(usersex);
      var userage = localStorage["settings.userage"];
      console.log(userage);
      var vaccinated = localStorage["survey.vaccinated"];
      console.log(vaccinated);

      if (userage && usersex && vaccinated) {
        return true;
      } else {
        return false;
      },
      done: function() {
        HEAT.survey.currentStep = 1;
      }
    }
  }
}

// Survey questions need to know the current location of the user
survey_position = function (loc) {
  console.log("User position: " + loc.coords.latitude + ", " + loc.coords.longitude);
};

no_position = function (err) {
  if (err.code == 1) {
    console.log("User said no to sharing GPS");
  } else if (err.code == 2) {
    console.log("Position request timed out");
  }
};

$(document).ready(function () {
  if (window.location.href.indexOf("survey") > -1)
  {
    navigator.geolocation.getCurrentPosition(survey_position, no_position, {enableHighAccuracy: false});
    console.log("Asked for user position");

    // Try to fill the birth date if known
    var userage = parseInt(localStorage['settings.userage']);
    if (userage) {
      $('#birth').val(userage);
    }
    // Try to fill the sex if known
    var usersex = localStorage['settings.usersex'];
    if (usersex == 0) {
      $('#usersex1').prop('checked', true);
    } else if (usersex == 1) {
      $('#usersex2').prop('checked', true);
    }
    // Try to fill the vaccinated if known
    var vaccinated = localStorage['survey.vaccinated'];
    if (vaccinated == 1) {
      $('#vaccinated').prop('checked', true);
    }

    // save on value change
    $('#birth').blur(function() {
      localStorage['settings.userage'] = $('#birth').val();
      console.log("birthday stored");
    });
    $("input[type='radio'][name='sex']").change(function() {
      localStorage['settings.usersex'] = $("input[type='radio'][name='sex']:checked").val();
      $(this).blur();
      console.log("sex stored");
    });
    $('#vaccinated').change(function () {
      console.log('vaccine triggered');
      if ($("input[name='vaccinated']:checked").length > 0)
      {
        localStorage['survey.vaccinated'] = 1;
        console.log('vaccinated stored');
      }
    });
  }
});

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
