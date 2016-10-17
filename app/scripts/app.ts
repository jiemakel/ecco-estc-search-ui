namespace app {
  'use strict'
  let m: angular.IModule = angular.module('app', [ 'http-auth-interceptor', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls' ])
  m.constant('serviceURL', 'http://localhost:9000/')
//  m.constant('serviceURL', 'https://vm0175.kaj.pouta.csc.fi/ecco-search/')
  m.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>'
      })
  })
  }
