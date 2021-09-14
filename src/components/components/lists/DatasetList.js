import React from 'react';
import { useHistory } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/**
 * Render dataset list
 */
const DatasetList = ({ datasets, dataset }) => {
    const history = useHistory();

    return (
        <List>
            {datasets && datasets.map((data) => (
                <ListItem
                    key={data.datasetId}
                    className={`rounded cursor-pointer bg-gray-100 hover:bg-blue-100 h-24 mb-2 shadow-md ${dataset && data.datasetId === dataset.metadata.datasetId ? 'bg-blue-200' : ''}`}
                    onClick={() => history.push(`/datasets/${data.datasetId}`)}
                >
                    <ListItemText
                        primary={data.datasetId}
                        secondary={`${data.survey.charAt(0)}${data.survey.substring(1).toLowerCase()}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default DatasetList;
