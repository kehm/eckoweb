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
                    className="cursor-pointer rounded"
                    onClick={() => history.push(`/datasets/${data.datasetId}`)}
                >
                    <ListItemText
                        className={dataset && data.datasetId === dataset.metadata.datasetId ? 'text-yellow-500' : ''}
                        primary={data.datasetId}
                        secondary={`${data.survey.charAt(0)}${data.survey.substring(1).toLowerCase()}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default DatasetList;
