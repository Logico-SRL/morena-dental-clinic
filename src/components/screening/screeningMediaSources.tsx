import UserControls from "../../userControls"

export const ScreeningMediaSources = ({ sources, selectedVisit, onSourceChange, segmentValue }: Pick<VisitPropType, 'sources' | 'selectedVisit' | 'onSourceChange' | 'segmentValue'>) => {

    const segments = sources
        .filter(s => s.visible)
        .map(source => ({
            value: source.id,
            label: <div style={{ padding: 5 }}>{source.name}</div>
        }))
    return <UserControls.Segmented
        disabled={!selectedVisit}
        value={segmentValue}
        style={{ flexWrap: 'wrap', display: 'flex' }}
        onChange={onSourceChange}
        // block
        options={segments}
    />
    {/* {sources.map(source => <UserControls.Col>
            <UserControls.Button disabled={!selectedVisit} style={{ borderRadius: 20 }} size={'large'} type="primary">{source.name}</UserControls.Button>
        </UserControls.Col>)} */}
}