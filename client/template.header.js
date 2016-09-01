import { $ } from 'meteor/jquery'
import { $Events, $Helpers } from './lib/_template'

$Events("header", {
  "click #mobile-menu-icon": () => $("body").toggleClass("show-mobile-menu"),
  "focus li a":              () => $("body").addClass("show-mobile-menu"),
  "click li a":              () => $("body").removeClass("show-mobile-menu")
});

$Helpers({
  header: {
    randomRenderer() {
      return _.chain([
        "webgl-wave",
        "webgl-flap",
        "webgl-bouncing"
      ]).shuffle().first().value();
    }
  }
});
