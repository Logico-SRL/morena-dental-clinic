import UserControls from "../../userControls";
import { formatUtils } from "../../utils/formatUtils";


type PropType = {
    visit: IVisit,
    loading: boolean
}



export const VisitInfo = ({ visit, loading }: PropType) => {

    const { Form, Row, Col, Typography } = UserControls;

    return <UserControls.Skeleton loading={loading}>
        <Row>
            <Col xs={12}>
                <Form.Item label={'Id'}>
                    {visit.id}
                </Form.Item>
            </Col>
            <Col xs={12}>
                <Form.Item label={'title'}>
                    {visit.title}
                </Form.Item>
            </Col>
            <Col xs={12}>
                <Form.Item label={'visit date'}>
                    {formatUtils.formatDateTime(new Date(visit.visitDate || new Date()))}
                </Form.Item>
            </Col>
            <Col xs={12}>
                <Form.Item label={'treatment'}>
                    {visit.treatment}
                </Form.Item>
            </Col>
            <Col xs={12}>
                <Form.Item label={'diagnosis'}>
                    {visit.diagnosis}
                </Form.Item>
            </Col>
            <Col xs={12}>
                <Form.Item label={'tags'}>
                    <UserControls.TagList value={visit.tags} />
                </Form.Item>
            </Col>

        </Row>

    </UserControls.Skeleton>
}