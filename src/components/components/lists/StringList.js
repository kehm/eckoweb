import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import IconButton from '@material-ui/core/IconButton';

/**
 * Render string list
 */
const StringList = ({ strings, preserveIndex, onUpdate }) => {
    /**
     * Remove string from array
     *
     * @param {int} index String index
     */
    const handleRemove = (index) => {
        if (index > -1 && strings.length < 50) {
            const arr = [...strings];
            arr.splice(index, 1);
            onUpdate(arr);
        }
    };

    return (
        <List>
            {strings.map((string, index) => (
                <ListItem key={index}>
                    <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">{string}</span>
                    {(preserveIndex === undefined || preserveIndex !== index) && (
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="remove"
                                onClick={() => handleRemove(index)}
                            >
                                <HighlightOffOutlined />
                            </IconButton>
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default StringList;
