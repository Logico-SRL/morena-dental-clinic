import { useMemo, useState } from "react"
import { useProjects } from "../../../hooks/useProjects"
import UserControls from "../../../userControls"

type PropType = {
    open: boolean,
    onCancel: () => void,
    onAdd: (project: IProject) => void,
    // onDelete: (note: INote) => void,
    macroproj: IMacroProject
}

export const AddProjectModal = ({ open, onCancel, onAdd, macroproj }: PropType) => {

    const { allProjects } = useProjects()
    const [selectedProj, setSelectedProj] = useState<IProject>();

    const options = useMemo(() => {
        return allProjects.filter(p => (macroproj?.projects || []).findIndex(pr => pr.id === p.id) < 0).map(p => (
            {
                value: p.id,
                label: `${p.title} - ${p.id}, ${p.category?.name}, ${p.patient.familyName} ${p.patient.firstName}`,
                item: p
            }))

    }, [allProjects, macroproj])

    return <UserControls.Modal open={open} width={'70vw'} onCancel={onCancel} okText={'Add'}
        onOk={() => selectedProj && onAdd(selectedProj)} okButtonProps={{ disabled: !selectedProj }}>
        <UserControls.Row style={{ minHeight: '50vh', paddingTop: 80 }}>
            <UserControls.Col xs={24}>
                <UserControls.Select
                    defaultOpen
                    style={{ width: '100%' }}
                    placeholder={'Select a project'}
                    showSearch
                    allowClear
                    options={options}
                    onSelect={(val, item) => {
                        setSelectedProj(item.item)
                    }}
                // filterOption={filterOnLabel}
                />
            </UserControls.Col>
        </UserControls.Row>

    </UserControls.Modal>
}