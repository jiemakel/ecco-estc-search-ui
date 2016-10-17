namespace app {
  'use strict'

  export class MainComponentController implements angular.IController {
    public searchFields: string[] = [ 'heading_index', 'metadata_pubDate', 'metadata_module', 'heading_frontmatter', 'metadata_documentType', 'contents_index', 'heading_backmatter', 'heading_body', 'contents_frontmatter', 'contents_TOC', 'metadata_notes', 'metadata_fullTitle', 'heading_TOC', 'contents_titlePage', 'contents_body', 'metadata_language', 'contents_backmatter' ]
    public resultFields: string[] = [ 'heading_index', 'metadata_documentID', 'metadata_pubDate', 'metadata_module', 'heading_frontmatter', 'metadata_documentType', 'heading_backmatter', 'heading_body', 'metadata_notes', 'metadata_fullTitle', 'heading_TOC', 'metadata_language', 'metadata_ESTCID' ]
    public selectedSearchFields: {[id: string]: boolean} = {}
    public selectedResultFields: {[id: string]: boolean} = {}
    public queryWords: {[id: string]: number} = {}
    public selectedQueryWords: {[id: string]: boolean}
    public query: string = ''
    public searchURL: string
    public queryURL: string = ''
    public returnedResultFields: string[]
    public examples: string[][]
    public totalResults: number
    public iframeSrc: any
    public mf: number = 1
    public selectAll(fieldType: 'search' | 'result', filter: string, select: boolean): void {
      switch (fieldType) {
        case 'search': for (let field of this.searchFields) if (field.indexOf(filter) === 0) this.selectedSearchFields[field] = select; break
        case 'result': for (let field of this.resultFields) if (field.indexOf(filter) === 0) this.selectedResultFields[field] = select; break
        default: throw 'cannot happen'
      }
    }
    public updateQuery(query: string, maxDistance: number, prefix: number): void {
      this.$http.get(this.serviceURL + 'terms', {
        params: { q: query, d: maxDistance, cp: prefix, f: this.searchFields.filter(f => this.selectedSearchFields[f]) }
      }).then((response: angular.IHttpPromiseCallbackArg<{[id: string]: number}>) => {
        this.queryWords = response.data!
        this.selectedQueryWords = {}
        for (let qw in this.queryWords) this.selectedQueryWords[qw] = true
      })
    }
    public loadExamples(): void {
      this.$http.get(this.serviceURL + 'jsearch', {
        params: { q: this.query, f: this.searchFields.filter(f => this.selectedSearchFields[f]), rf: this.resultFields.filter(f => this.selectedResultFields[f]), l: 10, mf: this.mf},
        headers: { 'Accept': 'application/json' }
      }).then((response: angular.IHttpPromiseCallbackArg<{ total: number, fields: string[], results: string[][]}>) => {
        this.totalResults = response.data!.total
        this.returnedResultFields = response.data!.fields
        this.examples = response.data!.results
      })
    }
    public addToQuery(): void {
      for (let qw in this.queryWords) if (this.selectedQueryWords[qw]) this.query += ' ' + (qw.indexOf(' ') !== -1 ? '"' + qw + '"' : qw)
      this.selectedQueryWords = {}
      this.query = this.query.trim()
      this.updateQueryURL()
    }
    public updateQueryURL(): void {
      this.queryURL = this.serviceURL + 'search?q=' + encodeURIComponent(this.query) + this.searchFields.filter(f => this.selectedSearchFields[f]).map(f => '&f=' + f).join('') + this.resultFields.filter(f => this.selectedResultFields[f]).map(f => '&rf=' + f).join('') + '&mf=' + this.mf
      this.loadExamples()
    }
    public eccoSearch(query: string): void {
      this.iframeSrc = this.$sce.trustAsResourceUrl('http://find.galegroup.com/ecco/quickSearch.do?prodId=ECCO&bannerSearch=true&quickSearchTerm=' + encodeURIComponent(query))
    }
    constructor(private serviceURL: string, private $http: angular.IHttpService, private $sce: angular.ISCEService) {
      this.searchURL = $sce.trustAsResourceUrl(serviceURL + 'search')
      for (let field of this.searchFields) if (field.indexOf('contents_') === 0 || field.indexOf('heading_') === 0) this.selectedSearchFields[field] = true
      this.selectedResultFields['metadata_ESTCID'] = true
    }
  }

  export class MainComponent implements angular.IComponentOptions {
    public controller: string = 'MainComponentController'
    public templateUrl: string = 'partials/main.html'
  }
}
