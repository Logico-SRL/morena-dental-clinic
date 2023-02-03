import { FunctionComponent } from "react";
import UserControls from "../..";
import classnames from './taglist.module.scss';

type PropType = {
    value?: ITag[],
}

const TagList: FunctionComponent<PropType> = ({
    value,
}) => {


    return !value || value.length == 0 ? null : <UserControls.Row className={classnames.tagListContainer}>
        <UserControls.Col xs={12} className={classnames.tagsContainer}>
            {(value || []).map(tag => <UserControls.Tag
                key={tag.tag}
                color={'blue'}
            >
                {tag.tag}
            </UserControls.Tag>)}
        </UserControls.Col>
    </UserControls.Row>
}

export default TagList;