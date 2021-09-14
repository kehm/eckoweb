import React from 'react';
import { useHistory } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditOutlined from '@material-ui/icons/EditOutlined';
import strings from '../../../strings';
import formatDate from '../../../utils/format-date';

/**
 * Render contribution list
 */
const ContributionList = ({ datasets, dataset }) => {
    const history = useHistory();

    return (
        <List>
            {datasets && datasets.map((data) => (
                <ListItem
                    key={data.metadata.datasetId}
                    className="cursor-pointer rounded"
                    onClick={() => history.push(`/contributions/${data.metadata.datasetId}`)}
                >
                    <ListItemText
                        className={dataset && data.metadata.datasetId === dataset.metadata.datasetId ? 'text-yellow-500' : ''}
                        primary={data.metadata.datasetId}
                        secondary={data.metadata.createdAt && `${strings.labelUploaded}: ${formatDate(data.metadata.createdAt)}`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => history.push(`/edit/${data.metadata.datasetId}`)}
                        >
                            <EditOutlined />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default ContributionList;
