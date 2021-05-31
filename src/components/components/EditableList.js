import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import StringList from './StringList';
import InfoPopover from './InfoPopover';

/**
 * Render editable list
 */
const EditableList = ({
    name, type, preserveIndex, headerLabel, label,
    info, value, options, onChange, onChangeArr, onAdd,
}) => {
    /**
     * Trigger onAdd on Enter key press
     *
     * @param {Object} e Event
     */
    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAdd();
        }
    };

    return (
        <div className="border border-solid p-4 rounded border-gray-300 mb-6">
            <h3 className="font-semibold text-sm mb-6">{headerLabel}</h3>
            <div className="flex">
                <TextField
                    onKeyDown={handleOnKeyDown}
                    id={name}
                    name={name}
                    type={type === 'url' ? 'url' : 'text'}
                    label={label}
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    InputProps={{
                        endAdornment:
                            <span className="absolute -left-11 sm:-left-16 top-0">
                                <span className="-ml-2">
                                    <InfoPopover content={info} />
                                </span>
                            </span>,
                    }}
                    inputProps={{ maxLength: 280 }}
                />
                <span className="flex-1 ml-2">
                    <IconButton
                        edge="end"
                        aria-label="approve"
                        color="primary"
                        onClick={() => onAdd()}
                    >
                        <Add />
                    </IconButton>
                </span>
            </div>
            <StringList
                strings={options}
                preserveIndex={preserveIndex}
                onUpdate={(arr) => onChangeArr(arr)}
            />
        </div>
    );
};

export default EditableList;
