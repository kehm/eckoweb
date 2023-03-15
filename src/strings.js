/**
 * String constants
 */
const strings = {
    siteSubTitle: 'Ecological Consortium on Resurvey Data',
    navHome: 'Home',
    navAbout: 'About',
    navContact: 'Contact',
    navDatasets: 'Datasets',
    navMySite: 'My Site',
    navSubmit: 'Submit',
    navContracts: 'Contracts',
    navContributions: 'Contributions',
    navContribute: 'Contribute',
    navAdmin: 'Admin',
    navPrivacy: 'Privacy',
    navWhatIs: 'What is ECKO?',
    navProfile: 'Profile',
    labelId: 'Dataset ID',
    labelDataset: 'Dataset',
    labelName: 'Dataset Name',
    labelDescription: 'Description',
    labelIllustration: 'Illustration',
    labelContact: 'Contact',
    labelSampleYears: 'Sample year(s)',
    labelCountries: 'Countries',
    labelContinents: 'Continents',
    labelNoSpecies: 'Species number',
    labelSurvey: 'Survey',
    labelSurveyType: 'Survey type',
    labelOriginal: 'Original survey',
    labelTaxon: 'Taxon',
    labelTaxa: 'Taxa',
    labelHabitat: 'Habitat',
    labelHabitats: 'Habitats',
    labelGeoRef: 'Georeference',
    labelUseCase: 'Use case:',
    labelReader: 'Reader:',
    labelApprover: 'Approver:',
    labelStatus: 'Status:',
    labelCreated: 'Created:',
    labelModified: 'Modified',
    labelRequested: 'Requested:',
    labelLicense: 'License',
    labelCitation: 'Bibliographic citation',
    labelCustom: 'Enter your custom license text:',
    labelApplyLicense: 'Apply a license to your dataset:',
    labelReferences: 'Reference (DOI URL)',
    labelReference: 'Protocol reference',
    labelRefs: 'References',
    labelRestrict: 'Do you want to manually approve every request?',
    labelFrom: 'From',
    labelTo: 'To',
    labelFullName: 'Full name',
    labelEmail: 'Email',
    labelUploaded: 'Uploaded',
    labelLastUpdate: 'Last update:',
    labelContributors: 'Contributors',
    labelSelectLicense: 'License',
    labelRestrictTypes: 'Access policy',
    labelTerms: 'Terms',
    labelLocationRemarks: 'Location description',
    labelSelectFeedback: 'Select category',
    labelLanguages: 'Languages',
    labelSelectLanguages: 'Select languages...',
    labelProtocol: 'Sampling protocol',
    labelSelectProtocol: 'Select sampling protocol...',
    labelProtocolRef: 'Sampling protocol reference',
    labelUnit: 'Sample unit',
    labelSelectUnit: 'Select sample unit...',
    labelSampleValue: 'Sample size',
    labelPlotNumber: 'Plot number',
    labelMeasurement: 'Measurement remarks',
    labelGeodeticDatum: 'Geodetic datum',
    labelSpatialExtent: 'Spatial extent',
    labelSelectCollection: 'Parent dataset',
    labelLatitude: 'Latitude',
    labelLongitude: 'Longitude',
    labelProposal: 'Proposal (max. 580 characters)',
    labelCollection: 'Parent dataset:',
    labelAssigned: 'Assigned',
    labelUnassigned: 'Unassigned',
    labelRole: 'Role',
    labelResponse: 'Rejection response (max. 560 characters)',
    labelContract: 'Contract',
    titleDatasetRef: 'ref.:',
    titleLicense: 'Licensed use',
    titleAbout: 'About',
    titlePolicy: 'Access Policy',
    titleSuccess: 'Success',
    buttonAdd: 'Add',
    buttonReadMore: 'Read More',
    buttonExplore: 'Explore',
    buttonContactUs: 'Contact Us',
    buttonFind: 'Find',
    buttonApprove: 'Approve',
    buttonReject: 'Reject',
    buttonRemove: 'Remove',
    buttonConfirm: 'Confirm',
    buttonDownload: 'Download Now',
    buttonRequest: 'Submit Request',
    buttonSubmit: 'Submit request',
    buttonSubmitDataset: 'Submit dataset',
    buttonRegister: 'Register',
    buttonSave: 'Save',
    buttonCookieAccept: 'Accept all',
    buttonCookieReject: 'Reject all',
    buttonOrcid: 'Sign in with ORCID',
    buttonDeleteProfile: 'Delete Profile',
    buttonCancel: 'Cancel',
    buttonHome: 'Return to Home',
    buttonDeleteAffiliation: 'Remove affiliation',
    buttonDeleteUserAffil: 'Remove user',
    buttonWithdraw: 'Withdraw request',
    buttonResetEmail: 'Reset email',
    buttonReset: 'Reset',
    headerDatasets: 'Datasets',
    headerSubmit: 'Submit Dataset',
    headerSampling: 'Sampling',
    headerMetadata: 'Taxa',
    headerYears: 'Location',
    headerContactInfo: 'Contact and Contributors',
    headerNoDatasets: '#Datasets',
    headerDownloads: '#Downloads',
    headerBlocks: '#Blocks',
    headerMembers: '#Members',
    headerFeedback: 'Feedback',
    headerUsers: 'User roles',
    headerProposal: 'Request Download',
    headerChangeEmail: 'Change email',
    headerResponse: 'Response:',
    headerConfirm: 'Please Confirm',
    infoTerms: 'This dataset has usage terms specified by the data owner:',
    infoDataset: 'Select the dataset file. The file must be in XLS, XLSX, ODS or CSV format and have a maximum size of 25MB.',
    infoDescription: 'Enter a description or explanatory summary of your dataset. Maximum length is 560 characters.',
    infoSurvey: 'Specify if the file contains an original survey, resurvey or both (combination).',
    infoOriginal: 'Select the original dataset to this resurvey. Information about the location of the survey will be copied from the original dataset entry. Leave the field blank if the original dataset has not been submitted to ECKO.',
    infoSuperset: 'Select Yes if this dataset is a subset of another dataset in the consortium. If the dataset is not related to any other datasets in the consortium select No.',
    infoParentSet: 'If the dataset is a subset of another dataset in ECKO, this is the parent set. A parent set could for instance have stricter terms attached to it, while a smaller subset could be availble with general license.',
    infoImage: 'Select an image to use as an illustration of your dataset. You must make sure that you have the required legal rights to use the image before uploading it.',
    infoDataType: 'Select data type (permanent, semi-permanent or non-permanent plots).',
    infoMeasure: 'Select measure method (abundance or presence/absence).',
    infoMethod: 'Select method.',
    infoTaxon: 'Categorise the organisms recorded in the dataset. For datasets spanning more than one taxa multiple taxonomic categories are permitted.',
    infoHabitat: 'A category or description of the habitat. For datasets spanning numerous habitats, multiple entries are permitted.',
    infoNoPlots: 'Enter the number of plots present in the dataset.',
    infoNoSpecies: 'A numeric value representing the total number of unique species recorded within the dataset.',
    infoLicense: 'Select a license to apply to your dataset. Licenses control what users can do with your data and how they are required to give attributions.',
    infoCustom: 'Write your custom license.',
    infoReferences: 'Cite a data source by entering its DOI URL. This should be a valid link starting with http:// or https://. You can cite multiple sources.',
    infoRestrict: 'Select Yes if you want to individually approve each access request of your dataset. The user requesting access must specify a use case when requesting access.',
    infoSampleYears: 'The year/year-range of the survey.',
    infoCountries: 'Select the countries where your survey took place. If you are uploading a resurvey, the countries are copied automatically from the original dataset.',
    infoContinents: 'Select the continents where your survey took place. If you are uploading a resurvey, the continents are copied automatically from the original dataset.',
    infoGeoRef: 'Select approximate coordinates for your survey by clicking on the map. The georeference will be used as an illustration of where your survey took place. If you are uploading a resurvey, the georeference coordinates are copied automatically from the original dataset.',
    infoMainContact: 'The contact section is filled out automatically based on the details in your ORCID profile and your email registered with ECKO. You should also add the names of everyone that has contributed to the dataset. This information is public.',
    infoContributors: 'Add the full name of each contributor to your dataset by clicking the + icon. Always notify the people that you add to this list. This information is public.',
    infoAffilition: 'The organization administrator must verify that you are in fact part of the organization before you can start submitting data. Your name and email address will be shared with the administrator and you will be notified by email when this process has finished. The administrator may also contact you by email if additional information is required.',
    infoFeedback: 'Do you need assistance in using our services? Send us a request by filling out the form below and we will contact you as soon as possible!',
    infoRestrictTypes: 'You can either apply a Creative Commons license to your work or choose to approve requests individually based on users\' intended use-cases. If you choose to approve requests individually, you will be notified by email each time a user requests your dataset and the user is not able to download the dataset until you have approved the request.',
    infoRestriction: 'Specify on which terms you will consider requests for the dataset. These terms will be displayed to users that wish to use your dataset. Maximum length is 560 characters.',
    infoLocationRemarks: 'Comments or notes about the location. Maximum length is 560 characters.',
    infoLanguages: 'Select the languages used in your dataset.',
    infoProtocol: 'Categorize the sampling procedure.',
    infoProtocolRef: 'Reference published methodology by article DOI. This should be a valid link starting with http:// or https://.',
    infoUnit: 'The unit of measurement of the size (time duration, length, area, or volume) of a sample in a sampling event.',
    infoSampleValue: 'A numeric value for a measurement of the size (time duration, length, area, or volume) of a sample in a sampling event.',
    infoPlotNumber: 'A numeric value representing the number of unique sample units (plots, transects etc).',
    infoMeasurement: 'Comments or notes accompanying the sample measurements/sampling protocol. Maximum length is 560 characters.',
    infoGeodeticDatum: 'The ellipsoid, geodetic datum, or spatial reference system (SRS) upon which the geographic coordinates (spatial extent) is based e.g. WGS84, UTM, GRS80.',
    infoSpatialExtent: 'Geographic coordinates representing the spatial extent of a spatial data frame.',
    infoMetadata: 'Enter the habitats and taxa for your data, as well as the total number of unique species recorded. Separate each habitat or taxon with a comma.',
    infoGeo: 'Enter relevant geographical information for the data present in the dataset. The approximate location of where the survey took place should be selected on the map.',
    infoSampling: 'Enter information on the type of sampling performed on the data.',
    infoGeneral: 'Select your dataset file and enter the required supporting information. The submission form has six steps and requires information on sampling details, geographic location, taxa, habitats, contact details and the preferred access policy or license.',
    infoPolicy: 'The access policy controls who can download your data. Make sure that you understand the implications of each policy and license before selecting one.',
    infoLinkExpired: 'to generate a new confirmation link.',
    infoProposal: 'User proposal:',
    infoDatasetLicense: 'You must adhere to the requirements of the specified license in order to use this dataset. This license is legally binding and the dataset owner can take legal action if the requirements are not met.',
    infoFilter: 'Apply a filter to the list. The filter checks if an attribute is a complete or partial match of the parameters entered here.',
    infoReject: 'If you choose to reject the proposal, enter a response to the requester justifying the rejection. The requester will then be able to create a revised request. If you accept the proposal, the response will be empty.',
    infoChangeEmail: 'Enter your new email address. Your new address will become active after you have confirmed the address. A confirmation link will be sent to your new email.',
    infoDataRequests: 'Check and resolve your pending contract proposals. The Contracts tab shows your existing contracts.',
    textConfirmWithdraw: 'Are you sure that you want to withdraw your proposal?',
    textConfirmAccept: 'Are you sure that you want to accept this proposal? This action cannot be regretted.',
    textConfirmReject: 'Are you sure that you want to reject this proposal? This action cannot be regretted.',
    textConfirmSubmitReport: 'Are you ready to submit your ticket?',
    textConfirmSubmitDataset: 'Are you ready to submit your dataset? The submission might take a minute to complete. Please make sure that you have read and understood the ECKO privacy policy before confirming your submission.',
    textConfirmSaveDataset: 'Are you sure you want to save your changes? It will take ca. 5 minutes for your changes to appear. If you have changed the access policy, note that users that have already acquired your dataset can continue to use it according to the policy active at that time.',
    textConfirmDownload: 'By downloading this dataset you accept the terms of the associated license and a contract between you and the data owner will be placed on the blockchain. This might take a minute.',
    textConfirmSubmitRequest: 'Are you ready to submit your request? The dataset owner will be notified and must accept the request before you can download the dataset. The request includes your name and email address.',
    textConfirmRemove: 'Are you sure that you want to remove your current affiliation? Removing the affiliation will reset your role in the organization.',
    textConfirmRemoveUser: 'Are you sure that you want to remove this user from your organization?',
    textConfirmRemoveDataset: 'Are you sure that you want to remove the dataset from ECKO? The dataset will no longer be available to download, but the metadata is persisted on the blockchain. This action cannot be regretted.',
    filterApply: 'Apply',
    filterShow: 'Filter',
    resurvey: 'Resurvey',
    original: 'Original',
    combination: 'Combination',
    modified: 'modified',
    reportBug: 'Report a bug',
    suggestion: 'Suggestion',
    explainHelp: 'Describe your issue',
    goBack: 'Back',
    submit: 'Submit',
    next: 'Next',
    step: 'step',
    copyright: 'Copyright ',
    year: '2021-2023',
    yes: 'Yes',
    no: 'No',
    signOut: 'Sign out',
    signOutsmall: ' (sign out)',
    expired: 'Your session has expired. Please sign in again.',
    notifyEmail: 'You will be notified by email when your request has been successfully processed. You can also check the status of the request by going to your ',
    contractsPage: 'contracts page',
    emailApprove: 'You will be notified by email whenever someone requests to use your dataset. The request will also include a message from the user, specifying the intended use of the data.',
    proposalRequired: 'You must send a proposal specifying what purpose you intend to use the dataset for before being allowed to download and use the dataset. Your proposal must be compatible with the terms already specified by the owner.',
    contractCreate: 'Your proposal is saved permanently on the blockchain in a contract between you and the data owner. You may only use the dataset in accordance with the details specified in this contract proposal. This is a legally binding contract.',
    cookieNotice: 'This website uses cookies for analytics purposes.',
    cookieInfo: 'By clicking the "Accept all" button you approve the use of cookies.',
    cookieInfo2: 'If you want to reject all non-essential cookies, click the "Reject all" button.',
    cookieHeader: 'Cookie Notice',
    aboutLicenses: 'Read more about the Creative Commons licenses',
    submitSuccess: 'Your dataset was successfully submitted to the consortium and will be visible in the list of public datasets in ca. 5 minutes. You can find a list of all your datasets in the Contributions menu. Thank you for contributing to the ECKO consortium!',
    editSuccess: 'Your changes were successfully saved and will be visible in the list of public datasets in ca. 5 minutes. Thank you for contributing to the ECKO consortium!',
    errorTryAgain: 'An error occurred. Please try again later.',
    errorSubmission: 'Submission failed unexpectedly. Please try again.',
    errorRegister: 'Registration failed. Your email address is either invalid or is already registered on a different user. Please try registering with a different email address.',
    errorSignIn: 'Could not sign in! Please try again later or submit a help ticket if the error persists.',
    pendingIn: 'Pending in',
    pendingOut: 'Pending out',
    rejected: 'Rejected',
    orcidSignIn: 'Sign in with ORCID to continue',
    orcidInfo: '<p>ORCID is an independent non-profit organization that provides a persistent identifier – an ORCID iD – that distinguishes you from other researchers and a mechanism for linking your research outputs and activities to your iD. ORCID is integrated into many systems used by publishers, funders, institutions, and other research-related services. Learn more at <a target="_blank" href="https://orcid.org" rel="noopener noreferrer">orcid.org</a>. </p>',
    orcidRegister: ' Don\'t have an ORCID iD yet? ',
    registerNow: 'Register now!',
    depName: 'Department of Biological Sciences, University of Bergen (UiB), Norway',
    allRightsReserved: 'All rights reserved',
    urlCc: 'https://creativecommons.org/about/cclicenses',
    urlOrcidReg: 'https://orcid.org/register',
    noteAffil: 'To submit datasets to ECKO you must first register with one of the ECKO member organizations. Your dataset files will be stored on servers belonging to the organization where you are registered.',
    noAffil: 'Are you not affiliated with an ECKO member organization? Contact ',
    email: 'ecko@uib.no',
    noAffiliations: 'As an administrator you can assign roles to users that register with your organization. Review the users in the list below and assign the appropriate roles. If the user is an external user that you have been in contact with and trust, assign the user an external role. External users can still upload datasets on behalf of your organization. Remove users that you do not recognize.',
    noAffil2: ' with a request to be added as an external member of an organization. Your request should include information about who you are and what type of data you intend to submit.',
    pleaseVerify: 'You will also receive an email with a link to verify your email address. Please verify your email address.',
    signupSuccess: 'You have successfully registered your e-mail address and can now start using the service.',
    welcome: 'Welcome',
    textBeforeUpload: 'before submitting your dataset.',
    byClickingSubmit: ' By clicking submit you confirm that you have understood and accept this policy.',
    unaffiliated: 'Unaffiliated',
    mandatory: 'Fields marked with * are mandatory.',
    errorExisting: 'The contributor is already added.',
    selectAffiliation: 'Affiliation',
    bugReport: 'Report Error',
    help: 'Get Help',
    titleFeedback: 'Click to get help or provide feedback',
    urlCCBY40: 'https://creativecommons.org/licenses/by/4.0/deed.en',
    urlVues: 'https://commons.wikimedia.org/wiki/File:Vues_des_Cordilleres;_planches_Wellcome_L0019404.jpg',
    bgImg: 'Home background image ',
    bgImgName: 'Vues des Cordilleres: planches',
    bgImgOwner: 'Wellcome Library, London',
    ccby40: 'CC BY 4.0',
    bgImgChanges: 'Cropped and filtered from original',
    usedUnder: 'used under',
    by: 'by',
    navFind: 'Find',
    readOur: ' Read our ',
    privacyPolicy: 'Privacy Policy',
    orcidSuccess: 'Thank you for connecting your ORCID iD',
    orcidUrl: 'https://orcid.org/',
    orcidDetails: ' The name on this user profile is pulled from your ORCID profile.',
    restrict: 'Usage terms',
    eckoTeam: '- The ECKO Team',
    goSignIn: 'Go to Sign In',
    created: 'Created',
    updated: 'updated',
    noContributions: 'You have not submitted any datasets to ECKO.',
    justSubmitted: 'If you just submitted a dataset, it should be visible here within ca. 5 minutes.',
    noRole: 'You do not have the required permissions to submit datasets.',
    noPendingIn: 'You have no pending contract proposals from other users',
    noPendingOut: 'You have no pending contract proposals for other datasets',
    noContracts: 'There are no contracts related to you or your datasets',
    noUnassigned: 'There are no unassigned users for your organization',
    noAssigned: 'There are no users registered for your organization',
    max: 'max.',
    files: 'file(s)',
    maxSize: '25 MB',
    bytes: 'bytes',
    dragAndDrop: 'Drag files here, or click to open the select files dialog',
    acceptedFileTypes: 'accepts only *.xls, *.xlsx, *.ods and *.csv file types',
    acceptedImageTypes: 'accepts only *.jpg, *.jpeg and *.png file types',
    selectedFiles: 'Selected files',
    missingDataset: 'Please select a dataset file',
    clickMap: 'click the map to select',
    noAlternatives: 'No alternatives',
    emailVerified: 'Your email address was successfully verified. You can now sign back in to the service and start using ECKO.',
    pleaseVerifyEmail: 'Please verify your email address',
    mustVerify: 'Your account is not associated with a verified email address. Please verify your email address to continue using ECKO.',
    invalidRole: 'Invalid role',
    roleRequired: 'You do not have the necessary role to access this feature. Contact your organization administrator to be granted additional privileges.',
    linkExpired: 'The link has expired',
    linkSignIn: 'Sign in ',
    linkSent: 'The confirmation link has been sent. Please check your email.',
    sendLink: 'Send link',
    notReceive: 'Did you not receive an email with a link to confirm your address? Click to send a new link.',
    errorDatasets: 'Could not load datasets. Please try again later.',
    verifyFirst: 'You must verify your email address before downloading the dataset',
    youMust: 'You must',
    signInFirst: 'before downloading the dataset',
    signIn: ' sign in ',
    accept: 'Accept',
    reject: 'Reject',
    connectBlockchain: 'Connecting to the blockchain...',
    signInInfo: 'You must sign in and register before you can download datasets or submit new datasets. Please sign in using your ORCID iD.',
    changeAffiliation: 'Change affiliation',
    setAffiliation: 'Select your affiliation. You will not be granted the rights to upload datasets on behalf of the organization until an organization administrator has assigned you a role within the organization. You can contact the administrator by email to speed up the process.',
    noteChangeAffil: 'Changing your affiliation will sign you out of the service and reset your role within your current affiliation.',
    goTo: 'Go to the',
    submitPage: ' submit page ',
    toSubmit: 'to submit a dataset.',
    profilePage: ' profile page ',
    toCheckProfile: 'to check your affiliation and role.',
    pleaseRegister: 'Please register your email address. The email address will be used for sending you notifications about your contributions. You should enter a personal email address associated with your affiliation if possible.',
    emailVerify: 'You will receive an email with a link to verify your email address after registering. Please verify your email address before you start using the service.',
    registerAffiliation: 'Register with an ECKO member organization',
    selectAffiliationHere: 'Select your affiliation here.',
    affiliationSuccess: 'Successfully registered affiliation. You will receive an email notification when the organization administrator has assigned you a role.',
    licensedContract: 'This contract was signed automatically.',
    resolveSuccess: 'Successfully updated contract. Refresh the page to get the updated contract list.',
    contractExists: 'You have already accepted the terms or license of this dataset',
    proposeNew: 'You will be notified by email when the proposal has been resolved. If the owner rejects your proposal, you will receive a message indicating why it was rejected. You can then create a new proposal if you wish.',
    removeDataset: 'Remove dataset',
    textConfirm: 'Are you sure you want to save your changes?',
    unknown: 'Unknown',
    ownerContract: 'You are the owner of this dataset',
    pleaseConfirm: 'Please Confirm',
};

export default strings;
