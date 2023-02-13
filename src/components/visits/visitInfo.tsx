import UserControls from "../../userControls";


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
                    {new Date(visit.visitDate || new Date()).toLocaleDateString()}
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