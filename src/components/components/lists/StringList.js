import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import KeyboardArrowUpOutlined from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlined from '@material-ui/icons/KeyboardArrowDownOutlined';
import IconButton from '@material-ui/core/IconButton';

/**
 * Render string list
 */
const StringList = ({
    strings, preserveItem, onUpdate, editable,
}) => {
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

    /**
     * Move item from one index to another
     *
     * @param {int} currentIndex Current item index
     * @param {int} newIndex New item index
     */
    const handleMove = (currentIndex, newIndex) => {
        const arr = [...strings];
        const item = arr.splice(currentIndex, 1)[0];
        arr.splice(newIndex, 0, item);
        onUpdate(arr);
    };

    return (
        <List>
            {strings.map((string, index) => (
                <ListItem key={index}>
                    <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">{string}</span>
                    <ListItemSecondaryAction>
                        {editable && (
                            <>
                                <span className="mr-2">
                                    <IconButton
                                        edge="end"
                                        aria-label="move up"
                                        onClick={() => handleMove(index, index - 1)}
                                        disabled={index === 0}
                                    >
                                        <KeyboardArrowUpOutlined />
                                    </IconButton>
                                </span>
                                <span className="mr-2">
                                    <IconButton
                                        edge="end"
                                        aria-label="move down"
                                        onClick={() => handleMove(index, index + 1)}
                                        disabled={index === strings.length - 1}
                                    >
                                        <KeyboardArrowDownOutlined />
                                    </IconButton>
                                </span>
                            </>
                        )}
                        <IconButton
                            edge="end"
                            aria-label="remove"
                            onClick={() => handleRemove(index)}
                            disabled={string === preserveItem}
                        >
                            <HighlightOffOutlined />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default StringList;
