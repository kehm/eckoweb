import React from 'react';
import { useHistory } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditOutlined from '@material-ui/icons/EditOutlined';
import formatDate from '../../../utils/format-date';

/**
 * Render dataset list
 */
const DatasetList = ({ datasets, dataset, editable }) => {
    const history = useHistory();

    return (
        <List>
            {datasets && datasets.map((data) => (
                <ListItem
                    key={editable ? data.metadata.datasetId : data.datasetId}
                    className={`rounded cursor-pointer bg-gray-100 hover:bg-blue-100 h-24 mb-2 shadow-md 
                    ${dataset && data.datasetId === dataset.metadata.datasetId ? 'bg-blue-200' : ''} 
                    ${dataset && data.metadata && data.metadata.datasetId === dataset.metadata.datasetId ? 'bg-blue-200' : ''}`}
                    onClick={() => {
                        if (editable) {
                            history.push(`/contributions/${data.metadata.datasetId}`);
                        } else history.push(`/datasets/${data.datasetId}`);
                    }}
                >
                    {editable ? (
                        <>
                            <ListItemText
                                primary={data.metadata.datasetId}
                                secondary={data.metadata.createdAt
                                    && formatDate(data.metadata.createdAt)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(`/edit/${data.metadata.datasetId}`);
                                    }}
                                >
                                    <EditOutlined />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </>
                    ) : (
                        <ListItemText
                            primary={data.datasetId}
                            secondary={`${data.survey.charAt(0)}${data.survey.substring(1).toLowerCase()}`}
                        />
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default DatasetList;
