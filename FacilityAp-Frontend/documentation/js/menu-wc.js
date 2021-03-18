'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">facility-tool-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' : 'data-target="#xs-components-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' :
                                            'id="xs-components-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' }>
                                            <li class="link">
                                                <a href="components/AddMailTemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddMailTemplateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ArchiefComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArchiefComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateDefectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateDefectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateExternalFirmDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateExternalFirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateTaskComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefectMeldenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DefectMeldenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstellingenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstellingenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MailTemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MailTemplateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatConfirmDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatContactsDiaglogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatContactsDiaglogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeldingDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeldingDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MijnMeldingenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MijnMeldingenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MijnTakenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MijnTakenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoodgevalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoodgevalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificatiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificatiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverzichtComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OverzichtComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskMeldenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskMeldenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateContactDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UpdateContactDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateMailtemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UpdateMailtemplateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' : 'data-target="#xs-injectables-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' :
                                        'id="xs-injectables-links-module-AppModule-6bf78454cd88fa7b18e9a9a33353dbb2"' }>
                                        <li class="link">
                                            <a href="injectables/ArchiveService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ArchiveService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CompressorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CompressorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConfirmDialogService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ConfirmDialogService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExportService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AzureGroups.html" data-type="entity-link">AzureGroups</a>
                            </li>
                            <li class="link">
                                <a href="classes/AzureGroups-1.html" data-type="entity-link">AzureGroups</a>
                            </li>
                            <li class="link">
                                <a href="classes/AzureUser.html" data-type="entity-link">AzureUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/AzureUser-1.html" data-type="entity-link">AzureUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category-1.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Emergency.html" data-type="entity-link">Emergency</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalFirm.html" data-type="entity-link">ExternalFirm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MailTemplate.html" data-type="entity-link">MailTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/OderComment.html" data-type="entity-link">OderComment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderCommentData.html" data-type="entity-link">OrderCommentData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Report.html" data-type="entity-link">Report</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportComment.html" data-type="entity-link">ReportComment</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportCommentData.html" data-type="entity-link">ReportCommentData</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ArchiveService.html" data-type="entity-link">ArchiveService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link">CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompressorService.html" data-type="entity-link">CompressorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfirmDialogService.html" data-type="entity-link">ConfirmDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmergencyService.html" data-type="entity-link">EmergencyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportService.html" data-type="entity-link">ExportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExternalfirmsService.html" data-type="entity-link">ExternalfirmsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailtemplateService.html" data-type="entity-link">MailtemplateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderCommentService.html" data-type="entity-link">OrderCommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link">OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link">ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpVoteService.html" data-type="entity-link">UpVoteService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MijnTakenGuard.html" data-type="entity-link">MijnTakenGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Food.html" data-type="entity-link">Food</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement.html" data-type="entity-link">PeriodicElement</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});