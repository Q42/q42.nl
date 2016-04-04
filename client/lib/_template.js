import { Template } from 'meteor/templating'
import { _ } from 'meteor/underscore'

// Helper to easily construct templates for multiple languages
$Template = function(templates) {
  _.each(templates, (values, tmpl) => {
    _tmpl("helpers", tmpl, values);
  });
};
$Events = function(tmpl, events) {
  _tmpl("events", tmpl, events);
};
$OnRendered = function(tmpl, fn) {
  _tmpl("onRendered", tmpl, fn);
};
$OnCreated = function(tmpl, fn) {
  _tmpl("onCreated", tmpl, fn);
};

_tmpl = function(type, tmpl, obj) {
  const result = Template["en_" + tmpl];
  if (result) result[type](obj);
  Template[tmpl][type](obj);
};

export { $Template, $Events, $OnRendered, $OnCreated }
