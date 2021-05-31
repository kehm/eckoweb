import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
// Importing unstable_ to get rid of findDOMNode warnings in strict mode. Should be fixed in material-ui v5.

/**
 * Create Material UI theme
 */
const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#F59E0B',
        },
        secondary: {
            main: '#1b1e28',
        },
    },
    overrides: {
        MuiInputBase: {
            root: {
                backgroundColor: 'white',
                '&$disabled': {
                    backgroundColor: '#E5E7EB',
                },
            },
        },
        MuiButton: {
            contained: {
                textTransform: 'inherit',
                minWidth: '10rem',
                minHeight: '2.5rem',
                fontSize: '1rem',
                '&$disabled': {
                    backgroundColor: '#E5E7EB',
                },
            },
            containedSizeSmall: {
                padding: '0.5rem',
                fontSize: '1rem',
            },
            containedSizeLarge: {
                padding: '0.75rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                fontSize: '1rem',
            },
        },
        MuiTextField: {
            root: {
                display: 'block',
                paddingBottom: '2rem',
            },
        },
        MuiTab: {
            root: {
                fontSize: '0.8rem',
                '&$selected': {
                    color: '#F59E0B',
                },
            },
        },
    },
});

export default materialTheme;
