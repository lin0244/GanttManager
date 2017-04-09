/**
 * Created by leino on 06/04/2017.
 */
var app = angular.module('app', ['ngMaterial', 'angularMoment', 'gantt', 'gantt.table', 'gantt.movable', 'gantt.tooltips']);
app.value('serverData', window.serverData)