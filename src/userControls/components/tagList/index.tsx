import { FunctionComponent } from "react";
import UserControls from "../..";
import classnames from './taglist.module.scss';

type PropType = {
    tags: ITag[]
}

const TagList: FunctionComponent<PropType> = ({
    tags
}) => {

    //     <Tag
    //     closable
    //     onClose={e => {
    //       e.preventDefault();
    //       this.handleClose(tag);
    //     }}
    //   >
    //     {tag}
    //   </Tag>
    return <UserControls.Row className={classnames.container}>
        {tags.map(tag => <UserControls.Tag key={tag.tag}>{tag.tag}</UserControls.Tag>)}

    </UserControls.Row>
}

export default TagList;