var app;
(function (app) {
    'use strict';
    var m = angular.module('app', ['http-auth-interceptor', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls']);
    m.constant('serviceURL', 'http://localhost:9000/');
    //  m.constant('serviceURL', 'https://vm0175.kaj.pouta.csc.fi/ecco-search/')
    m.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('main', {
            url: '/',
            template: '<main></main>'
        });
    });
})(app || (app = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEdBQUcsQ0FZVjtBQVpILFdBQVUsR0FBRyxFQUFDLENBQUM7SUFDYixZQUFZLENBQUE7SUFDWixJQUFJLENBQUMsR0FBb0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixDQUFFLENBQUMsQ0FBQTtJQUM3SCxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO0lBQ3BELDRFQUE0RTtJQUMxRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsY0FBeUMsRUFBRSxrQkFBaUQ7UUFDcEcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsUUFBUSxFQUFFLGVBQWU7U0FDeEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDRixDQUFDLEVBWk8sR0FBRyxLQUFILEdBQUcsUUFZViIsImZpbGUiOiJzY3JpcHRzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBhcHAge1xuICAndXNlIHN0cmljdCdcbiAgbGV0IG06IGFuZ3VsYXIuSU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbICdodHRwLWF1dGgtaW50ZXJjZXB0b3InLCAndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5ib290c3RyYXAudHBscycgXSlcbiAgbS5jb25zdGFudCgnc2VydmljZVVSTCcsICdodHRwOi8vbG9jYWxob3N0OjkwMDAvJylcbi8vICBtLmNvbnN0YW50KCdzZXJ2aWNlVVJMJywgJ2h0dHBzOi8vdm0wMTc1Lmthai5wb3V0YS5jc2MuZmkvZWNjby1zZWFyY2gvJylcbiAgbS5jb25maWcoKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21haW4nLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlOiAnPG1haW4+PC9tYWluPidcbiAgICAgIH0pXG4gIH0pXG4gIH1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var app;
(function (app) {
    'use strict';
    var MainComponentController = (function () {
        function MainComponentController(serviceURL, $http, $sce) {
            this.serviceURL = serviceURL;
            this.$http = $http;
            this.$sce = $sce;
            this.searchFields = ['heading_index', 'metadata_pubDate', 'metadata_module', 'heading_frontmatter', 'metadata_documentType', 'contents_index', 'heading_backmatter', 'heading_body', 'contents_frontmatter', 'contents_TOC', 'metadata_notes', 'metadata_fullTitle', 'heading_TOC', 'contents_titlePage', 'contents_body', 'metadata_language', 'contents_backmatter'];
            this.resultFields = ['heading_index', 'metadata_documentID', 'metadata_pubDate', 'metadata_module', 'heading_frontmatter', 'metadata_documentType', 'heading_backmatter', 'heading_body', 'metadata_notes', 'metadata_fullTitle', 'heading_TOC', 'metadata_language', 'metadata_ESTCID'];
            this.selectedSearchFields = {};
            this.selectedResultFields = {};
            this.queryWords = {};
            this.query = '';
            this.queryURL = '';
            this.mf = 1;
            this.searchURL = $sce.trustAsResourceUrl(serviceURL + 'search');
            for (var _i = 0, _a = this.searchFields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (field.indexOf('contents_') === 0 || field.indexOf('heading_') === 0)
                    this.selectedSearchFields[field] = true;
            }
            this.selectedResultFields['metadata_ESTCID'] = true;
        }
        MainComponentController.prototype.selectAll = function (fieldType, filter, select) {
            switch (fieldType) {
                case 'search':
                    for (var _i = 0, _a = this.searchFields; _i < _a.length; _i++) {
                        var field = _a[_i];
                        if (field.indexOf(filter) === 0)
                            this.selectedSearchFields[field] = select;
                    }
                    break;
                case 'result':
                    for (var _b = 0, _c = this.resultFields; _b < _c.length; _b++) {
                        var field = _c[_b];
                        if (field.indexOf(filter) === 0)
                            this.selectedResultFields[field] = select;
                    }
                    break;
                default: throw 'cannot happen';
            }
        };
        MainComponentController.prototype.updateQuery = function (query, maxDistance, prefix) {
            var _this = this;
            this.$http.get(this.serviceURL + 'terms', {
                params: { q: query, d: maxDistance, cp: prefix, f: this.searchFields.filter(function (f) { return _this.selectedSearchFields[f]; }) }
            }).then(function (response) {
                _this.queryWords = response.data;
                _this.selectedQueryWords = {};
                for (var qw in _this.queryWords)
                    _this.selectedQueryWords[qw] = true;
            });
        };
        MainComponentController.prototype.loadExamples = function () {
            var _this = this;
            this.$http.get(this.serviceURL + 'jsearch', {
                params: { q: this.query, f: this.searchFields.filter(function (f) { return _this.selectedSearchFields[f]; }), rf: this.resultFields.filter(function (f) { return _this.selectedResultFields[f]; }), l: 10, mf: this.mf },
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                _this.totalResults = response.data.total;
                _this.returnedResultFields = response.data.fields;
                _this.examples = response.data.results;
            });
        };
        MainComponentController.prototype.addToQuery = function () {
            for (var qw in this.queryWords)
                if (this.selectedQueryWords[qw])
                    this.query += ' ' + (qw.indexOf(' ') !== -1 ? '"' + qw + '"' : qw);
            this.selectedQueryWords = {};
            this.query = this.query.trim();
            this.updateQueryURL();
        };
        MainComponentController.prototype.updateQueryURL = function () {
            var _this = this;
            this.queryURL = this.serviceURL + 'search?q=' + encodeURIComponent(this.query) + this.searchFields.filter(function (f) { return _this.selectedSearchFields[f]; }).map(function (f) { return '&f=' + f; }).join('') + this.resultFields.filter(function (f) { return _this.selectedResultFields[f]; }).map(function (f) { return '&rf=' + f; }).join('') + '&mf=' + this.mf;
            this.loadExamples();
        };
        MainComponentController.prototype.eccoSearch = function (query) {
            this.iframeSrc = this.$sce.trustAsResourceUrl('http://find.galegroup.com/ecco/quickSearch.do?prodId=ECCO&bannerSearch=true&quickSearchTerm=' + encodeURIComponent(query));
        };
        return MainComponentController;
    }());/*<auto_generate>*/angular.module('app').controller('MainComponentController',['serviceURL','$http','$sce',function(){return new (Function.prototype.bind.apply(MainComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    app.MainComponentController = MainComponentController;
    var MainComponent = (function () {
        function MainComponent() {
            this.controller = 'MainComponentController';
            this.templateUrl = 'partials/main.html';
        }
        return MainComponent;
    }());/*<auto_generate>*/angular.module('app').component('main',new MainComponent());/*</auto_generate>*/
    app.MainComponent = MainComponent;
})(app || (app = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL21haW4tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsR0FBRyxDQW9FWjtBQXBFRCxXQUFVLEdBQUcsRUFBQyxDQUFDO0lBQ2IsWUFBWSxDQUFBO0lBRVo7UUFzREUsaUNBQW9CLFVBQWtCLEVBQVUsS0FBMkIsRUFBVSxJQUF5QjtZQUExRixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBc0I7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFxQjtZQXJEdkcsaUJBQVksR0FBYSxDQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUUsQ0FBQTtZQUM3VyxpQkFBWSxHQUFhLENBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUUsQ0FBQTtZQUMvUix5QkFBb0IsR0FBNEIsRUFBRSxDQUFBO1lBQ2xELHlCQUFvQixHQUE0QixFQUFFLENBQUE7WUFDbEQsZUFBVSxHQUEyQixFQUFFLENBQUE7WUFFdkMsVUFBSyxHQUFXLEVBQUUsQ0FBQTtZQUVsQixhQUFRLEdBQVcsRUFBRSxDQUFBO1lBS3JCLE9BQUUsR0FBVyxDQUFDLENBQUE7WUF5Q25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMs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QUhZLGlCQUFhLGdCQUd6QixDQUFBO0FBQ0gsQ0FBQyxFQXBFUyxHQUFHLEtBQUgsR0FBRyxRQW9FWiIsImZpbGUiOiJzY3JpcHRzL21haW4tY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGFwcCB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGV4cG9ydCBjbGFzcyBNYWluQ29tcG9uZW50Q29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBzZWFyY2hGaWVsZHM6IHN0cmluZ1tdID0gWyAnaGVhZGluZ19pbmRleCcsICdtZXRhZGF0YV9wdWJEYXRlJywgJ21ldGFkYXRhX21vZHVsZScsICdoZWFkaW5nX2Zyb250bWF0dGVyJywgJ21ldGFkYXRhX2RvY3VtZW50VHlwZScsICdjb250ZW50c19pbmRleCcsICdoZWFkaW5nX2JhY2ttYXR0ZXInLCAnaGVhZGluZ19ib2R5JywgJ2NvbnRlbnRzX2Zyb250bWF0dGVyJywgJ2NvbnRlbnRzX1RPQycsICdtZXRhZGF0YV9ub3RlcycsICdtZXRhZGF0YV9mdWxsVGl0bGUnLCAnaGVhZGluZ19UT0MnLCAnY29udGVudHNfdGl0bGVQYWdlJywgJ2NvbnRlbnRzX2JvZHknLCAnbWV0YWRhdGFfbGFuZ3VhZ2UnLCAnY29udGVudHNfYmFja21hdHRlcicgXVxuICAgIHB1YmxpYyByZXN1bHRGaWVsZHM6IHN0cmluZ1tdID0gWyAnaGVhZGluZ19pbmRleCcsICdtZXRhZGF0YV9kb2N1bWVudElEJywgJ21ldGFkYXRhX3B1YkRhdGUnLCAnbWV0YWRhdGFfbW9kdWxlJywgJ2hlYWRpbmdfZnJvbnRtYXR0ZXInLCAnbWV0YWRhdGFfZG9jdW1lbnRUeXBlJywgJ2hlYWRpbmdfYmFja21hdHRlcicsICdoZWFkaW5nX2JvZHknLCAnbWV0YWRhdGFfbm90ZXMnLCAnbWV0YWRhdGFfZnVsbFRpdGxlJywgJ2hlYWRpbmdfVE9DJywgJ21ldGFkYXRhX2xhbmd1YWdlJywgJ21ldGFkYXRhX0VTVENJRCcgXVxuICAgIHB1YmxpYyBzZWxlY3RlZFNlYXJjaEZpZWxkczoge1tpZDogc3RyaW5nXTogYm9vbGVhbn0gPSB7fVxuICAgIHB1YmxpYyBzZWxlY3RlZFJlc3VsdEZpZWxkczoge1tpZDogc3RyaW5nXTogYm9vbGVhbn0gPSB7fVxuICAgIHB1YmxpYyBxdWVyeVdvcmRzOiB7W2lkOiBzdHJpbmddOiBudW1iZXJ9ID0ge31cbiAgICBwdWJsaWMgc2VsZWN0ZWRRdWVyeVdvcmRzOiB7W2lkOiBzdHJpbmddOiBib29sZWFufVxuICAgIHB1YmxpYyBxdWVyeTogc3RyaW5nID0gJydcbiAgICBwdWJsaWMgc2VhcmNoVVJMOiBzdHJpbmdcbiAgICBwdWJsaWMgcXVlcnlVUkw6IHN0cmluZyA9ICcnXG4gICAgcHVibGljIHJldHVybmVkUmVzdWx0RmllbGRzOiBzdHJpbmdbXVxuICAgIHB1YmxpYyBleGFtcGxlczogc3RyaW5nW11bXVxuICAgIHB1YmxpYyB0b3RhbFJlc3VsdHM6IG51bWJlclxuICAgIHB1YmxpYyBpZnJhbWVTcmM6IGFueVxuICAgIHB1YmxpYyBtZjogbnVtYmVyID0gMVxuICAgIHB1YmxpYyBzZWxlY3RBbGwoZmllbGRUeXBlOiAnc2VhcmNoJyB8ICdyZXN1bHQnLCBmaWx0ZXI6IHN0cmluZywgc2VsZWN0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xuICAgICAgICBjYXNlICdzZWFyY2gnOiBmb3IgKGxldCBmaWVsZCBvZiB0aGlzLnNlYXJjaEZpZWxkcykgaWYgKGZpZWxkLmluZGV4T2YoZmlsdGVyKSA9PT0gMCkgdGhpcy5zZWxlY3RlZFNlYXJjaEZpZWxkc1tmaWVsZF0gPSBzZWxlY3Q7IGJyZWFrXG4gICAgICAgIGNhc2UgJ3Jlc3VsdCc6IGZvciAobGV0IGZpZWxkIG9mIHRoaXMucmVzdWx0RmllbGRzKSBpZiAoZmllbGQuaW5kZXhPZihmaWx0ZXIpID09PSAwKSB0aGlzLnNlbGVjdGVkUmVzdWx0RmllbGRzW2ZpZWxkXSA9IHNlbGVjdDsgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgJ2Nhbm5vdCBoYXBwZW4nXG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVRdWVyeShxdWVyeTogc3RyaW5nLCBtYXhEaXN0YW5jZTogbnVtYmVyLCBwcmVmaXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy4kaHR0cC5nZXQodGhpcy5zZXJ2aWNlVVJMICsgJ3Rlcm1zJywge1xuICAgICAgICBwYXJhbXM6IHsgcTogcXVlcnksIGQ6IG1heERpc3RhbmNlLCBjcDogcHJlZml4LCBmOiB0aGlzLnNlYXJjaEZpZWxkcy5maWx0ZXIoZiA9PiB0aGlzLnNlbGVjdGVkU2VhcmNoRmllbGRzW2ZdKSB9XG4gICAgICB9KS50aGVuKChyZXNwb25zZTogYW5ndWxhci5JSHR0cFByb21pc2VDYWxsYmFja0FyZzx7W2lkOiBzdHJpbmddOiBudW1iZXJ9PikgPT4ge1xuICAgICAgICB0aGlzLnF1ZXJ5V29yZHMgPSByZXNwb25zZS5kYXRhIVxuICAgICAgICB0aGlzLnNlbGVjdGVkUXVlcnlXb3JkcyA9IHt9XG4gICAgICAgIGZvciAobGV0IHF3IGluIHRoaXMucXVlcnlXb3JkcykgdGhpcy5zZWxlY3RlZFF1ZXJ5V29yZHNbcXddID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgcHVibGljIGxvYWRFeGFtcGxlcygpOiB2b2lkIHtcbiAgICAgIHRoaXMuJGh0dHAuZ2V0KHRoaXMuc2VydmljZVVSTCArICdqc2VhcmNoJywge1xuICAgICAgICBwYXJhbXM6IHsgcTogdGhpcy5xdWVyeSwgZjogdGhpcy5zZWFyY2hGaWVsZHMuZmlsdGVyKGYgPT4gdGhpcy5zZWxlY3RlZFNlYXJjaEZpZWxkc1tmXSksIHJmOiB0aGlzLnJlc3VsdEZpZWxkcy5maWx0ZXIoZiA9PiB0aGlzLnNlbGVjdGVkUmVzdWx0RmllbGRzW2ZdKSwgbDogMTAsIG1mOiB0aGlzLm1mfSxcbiAgICAgICAgaGVhZGVyczogeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlOiBhbmd1bGFyLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPHsgdG90YWw6IG51bWJlciwgZmllbGRzOiBzdHJpbmdbXSwgcmVzdWx0czogc3RyaW5nW11bXX0+KSA9PiB7XG4gICAgICAgIHRoaXMudG90YWxSZXN1bHRzID0gcmVzcG9uc2UuZGF0YSEudG90YWxcbiAgICAgICAgdGhpcy5yZXR1cm5lZFJlc3VsdEZpZWxkcyA9IHJlc3BvbnNlLmRhdGEhLmZpZWxkc1xuICAgICAgICB0aGlzLmV4YW1wbGVzID0gcmVzcG9uc2UuZGF0YSEucmVzdWx0c1xuICAgICAgfSlcbiAgICB9XG4gICAgcHVibGljIGFkZFRvUXVlcnkoKTogdm9pZCB7XG4gICAgICBmb3IgKGxldCBxdyBpbiB0aGlzLnF1ZXJ5V29yZHMpIGlmICh0aGlzLnNlbGVjdGVkUXVlcnlXb3Jkc1txd10pIHRoaXMucXVlcnkgKz0gJyAnICsgKHF3LmluZGV4T2YoJyAnKSAhPT0gLTEgPyAnXCInICsgcXcgKyAnXCInIDogcXcpXG4gICAgICB0aGlzLnNlbGVjdGVkUXVlcnlXb3JkcyA9IHt9XG4gICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS50cmltKClcbiAgICAgIHRoaXMudXBkYXRlUXVlcnlVUkwoKVxuICAgIH1cbiAgICBwdWJsaWMgdXBkYXRlUXVlcnlVUkwoKTogdm9pZCB7XG4gICAgICB0aGlzLnF1ZXJ5VVJMID0gdGhpcy5zZXJ2aWNlVVJMICsgJ3NlYXJjaD9xPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5xdWVyeSkgKyB0aGlzLnNlYXJjaEZpZWxkcy5maWx0ZXIoZiA9PiB0aGlzLnNlbGVjdGVkU2VhcmNoRmllbGRzW2ZdKS5tYXAoZiA9PiAnJmY9JyArIGYpLmpvaW4oJycpICsgdGhpcy5yZXN1bHRGaWVsZHMuZmlsdGVyKGYgPT4gdGhpcy5zZWxlY3RlZFJlc3VsdEZpZWxkc1tmXSkubWFwKGYgPT4gJyZyZj0nICsgZikuam9pbignJykgKyAnJm1mPScgKyB0aGlzLm1mXG4gICAgICB0aGlzLmxvYWRFeGFtcGxlcygpXG4gICAgfVxuICAgIHB1YmxpYyBlY2NvU2VhcmNoKHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIHRoaXMuaWZyYW1lU3JjID0gdGhpcy4kc2NlLnRydXN0QXNSZXNvdXJjZVVybCgnaHR0cDovL2ZpbmQuZ2FsZWdyb3VwLmNvbS9lY2NvL3F1aWNrU2VhcmNoLmRvP3Byb2RJZD1FQ0NPJmJhbm5lclNlYXJjaD10cnVlJnF1aWNrU2VhcmNoVGVybT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSlcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlVVJMOiBzdHJpbmcsIHByaXZhdGUgJGh0dHA6IGFuZ3VsYXIuSUh0dHBTZXJ2aWNlLCBwcml2YXRlICRzY2U6IGFuZ3VsYXIuSVNDRVNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc2VhcmNoVVJMID0gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoc2VydmljZVVSTCArICdzZWFyY2gnKVxuICAgICAgZm9yIChsZXQgZmllbGQgb2YgdGhpcy5zZWFyY2hGaWVsZHMpIGlmIChmaWVsZC5pbmRleE9mKCdjb250ZW50c18nKSA9PT0gMCB8fCBmaWVsZC5pbmRleE9mKCdoZWFkaW5nXycpID09PSAwKSB0aGlzLnNlbGVjdGVkU2VhcmNoRmllbGRzW2ZpZWxkXSA9IHRydWVcbiAgICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHRGaWVsZHNbJ21ldGFkYXRhX0VTVENJRCddID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBjbGFzcyBNYWluQ29tcG9uZW50IGltcGxlbWVudHMgYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgcHVibGljIGNvbnRyb2xsZXI6IHN0cmluZyA9ICdNYWluQ29tcG9uZW50Q29udHJvbGxlcidcbiAgICBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZyA9ICdwYXJ0aWFscy9tYWluLmh0bWwnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/main.html',
    '\n' +
    '<div class="row">\n' +
    '  <form class="col-md-4 col-lg-3" action="{{$ctrl.searchURL}}" method="POST">\n' +
    '    <h2>Configuration<i class="glyphicon glyphicon-chevron-down" ng-click="config=!config" ng-init="config=true"></i></h2>\n' +
    '    <div ng-show="config">\n' +
    '      <h3>Search fields</h3>\n' +
    '      <button class="btn btn-success" ng-click="$ctrl.selectAll(\'search\',\'\',true)">All</button>\n' +
    '      <button class="btn btn-danger" ng-click="$ctrl.selectAll(\'search\',\'\',false)">None</button>\n' +
    '      <h4>Metadata</h4>\n' +
    '      <button class="btn btn-sm btn-success" ng-click="$ctrl.selectAll(\'search\',\'metadata_\',true)">All</button>\n' +
    '      <button class="btn btn-sm btn-danger" ng-click="$ctrl.selectAll(\'search\',\'metadata_\',false)">None</button>\n' +
    '      <div class="checkbox-inline" ng-repeat="field in $ctrl.searchFields | filter:\'metadata_\'">\n' +
    '        <label>\n' +
    '          <input type="checkbox" name="f" value="{{field}}" ng-model="$ctrl.selectedSearchFields[field]"/>{{field.substring(9)}}\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <h4>Headings</h4>\n' +
    '      <button class="btn btn-sm btn-success" ng-click="$ctrl.selectAll(\'search\',\'heading_\',true)">All</button>\n' +
    '      <button class="btn btn-sm btn-danger" ng-click="$ctrl.selectAll(\'search\',\'heading_\',false)">None</button>\n' +
    '      <div class="checkbox-inline" ng-repeat="field in $ctrl.searchFields | filter:\'heading_\'">\n' +
    '        <label>\n' +
    '          <input type="checkbox" name="f" value="{{field}}" ng-model="$ctrl.selectedSearchFields[field]"/>{{field.substring(8)}}\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <h4>Contents</h4>\n' +
    '      <button class="btn btn-sm btn-success" ng-click="$ctrl.selectAll(\'search\',\'contents_\',true)">All</button>\n' +
    '      <button class="btn btn-sm btn-danger" ng-click="$ctrl.selectAll(\'search\',\'contents_\',false)">None</button>\n' +
    '      <div class="checkbox-inline" ng-repeat="field in $ctrl.searchFields | filter:\'contents_\'">\n' +
    '        <label>\n' +
    '          <input type="checkbox" name="f" value="{{field}}" ng-model="$ctrl.selectedSearchFields[field]"/>{{field.substring(9)}}\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <h3>Result fields</h3>\n' +
    '      <button class="btn btn-success" ng-click="$ctrl.selectAll(\'result\',\'\',true)">All</button>\n' +
    '      <button class="btn btn-danger" ng-click="$ctrl.selectAll(\'result\',\'\',false)">None</button>\n' +
    '      <h4>Metadata</h4>\n' +
    '      <button class="btn btn-sm btn-success" ng-click="$ctrl.selectAll(\'result\',\'metadata_\',true)">All</button>\n' +
    '      <button class="btn btn-sm btn-danger" ng-click="$ctrl.selectAll(\'result\',\'metadata_\',false)">None</button>\n' +
    '      <div class="checkbox-inline" ng-repeat="field in $ctrl.resultFields | filter:\'metadata_\'">\n' +
    '        <label>\n' +
    '          <input type="checkbox" name="rf" value="{{field}}" ng-model="$ctrl.selectedResultFields[field]"/>{{field.substring(9)}}\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <h4>Headings</h4>\n' +
    '      <button class="btn btn-sm btn-success" ng-click="$ctrl.selectAll(\'result\',\'heading_\',true)">All</button>\n' +
    '      <button class="btn btn-sm btn-danger" ng-click="$ctrl.selectAll(\'result\',\'heading_\',false)">None</button>\n' +
    '      <div class="checkbox-inline" ng-repeat="field in $ctrl.resultFields | filter:\'heading_\'">\n' +
    '        <label>\n' +
    '          <input type="checkbox" name="rf" value="{{field}}" ng-model="$ctrl.selectedResultFields[field]"/>{{field.substring(8)}}\n' +
    '        </label>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <h2>Search</h2>\n' +
    '    <div class="form-inline">\n' +
    '      <div class="form-group">\n' +
    '        <label>Max edit distance</label>\n' +
    '        <select ng-model="maxDistance" ng-init="maxDistance=\'1\'" ng-change="$ctrl.updateQuery(query,maxDistance,prefix)">\n' +
    '          <option value="0">0</option>\n' +
    '          <option value="1">1</option>\n' +
    '          <option value="2">2</option>\n' +
    '        </select>\n' +
    '      </div>\n' +
    '      <div class="form-group">\n' +
    '        <label>Required common prefix length</label>\n' +
    '        <input class="form-control" type="number" ng-model="prefix" ng-init="prefix=1" ng-change="$ctrl.updateQuery(query,maxDistance,prefix)"/>\n' +
    '      </div>\n' +
    '      <div class="checkbox">\n' +
    '        <label>\n' +
    '          <input type="checkbox" ng-model="transpose"/>Transposition is a single edit\n' +
    '        </label>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div class="form-group">\n' +
    '      <label>Query</label>\n' +
    '      <input class="form-control" type="text" ng-model="query" ng-change="$ctrl.updateQuery(query,maxDistance,prefix)" ng-model-options="{ debounce: 500 }"/>\n' +
    '    </div>\n' +
    '    <h2>Keywords</h2>\n' +
    '    <script type="text/ng-template" id="popover"></script>\n' +
    '    <div class="checkbox-inline" ng-repeat="(queryWord,frequency) in $ctrl.queryWords">\n' +
    '      <input type="checkbox" ng-model="$ctrl.selectedQueryWords[queryWord]"/>\n' +
    '      <label><span ng-click="$ctrl.eccoSearch(queryWord)">{{queryWord}} ({{frequency}})</span></label>\n' +
    '    </div>\n' +
    '    <button class="btn btn-success" ng-click="$ctrl.addToQuery()">Add to Query</button>\n' +
    '    <h2>Query</h2>\n' +
    '    <div class="form-inline">\n' +
    '      <div class="form-group">\n' +
    '        <label>Required term frequency</label>\n' +
    '        <input class="form-control" type="number" ng-model="$ctrl.mf" ng-change="$ctrl.updateQueryURL()" name="mf"/>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <textarea class="form-control" rows="5" name="q" ng-model="$ctrl.query" ng-change="$ctrl.updateQueryURL()" ng-model-options="{debounce:1000}"></textarea>\n' +
    '    <input class="form-control" readonly="readonly" type="text" ng-model="$ctrl.queryURL"/>\n' +
    '    <div ng-show="$ctrl.totalResults">\n' +
    '      <h3>Results</h3>({{$ctrl.totalResults}} results)\n' +
    '      <table class="table table-condensed table-bordered table-striped">\n' +
    '        <tr>\n' +
    '          <th ng-repeat="field in $ctrl.returnedResultFields">{{field}}</th>\n' +
    '        </tr>\n' +
    '        <tr ng-repeat="row in $ctrl.examples">\n' +
    '          <td ng-repeat="value in row">{{value}}</td>\n' +
    '        </tr>\n' +
    '      </table>\n' +
    '    </div>\n' +
    '    <input class="btn btn-success" ng-show="$ctrl.queryURL" type="submit"/>\n' +
    '  </form>\n' +
    '  <div class="col-md-8 col-lg-9">\n' +
    '    <div class="embed-responsive embed-responsive-4by3">\n' +
    '      <iframe ng-src="{{$ctrl.iframeSrc}}"></iframe>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();
