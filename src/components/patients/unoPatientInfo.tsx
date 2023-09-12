import { MCureRighe } from "../../repository/unoEntities/entities";
import UserControls from "../../userControls";
import { formatUtils } from "../../utils/formatUtils";
import { Sorter } from "../../utils/sorter";
import { SectionHeader } from "../userControls/sectionHeader";
import { TouchableRow } from "../userControls/touchableRow";

export const UnoPatientInfo = ({ unoAnagrafica }: { unoAnagrafica: UnoAnagrafica | undefined }) => {

    let cures: MCureRighe[] = [];
    unoAnagrafica?.mCureTestatas.forEach(cure => {
        cures = cures.concat(cure.mCureRighes)
    })
    cures.sort(new Sorter('dataEsecuzione').sortDateDesc)

    return <>

        <SectionHeader title="Indirizzi" links={[]} />
        {(unoAnagrafica?.aAnagraficaIndirizzis ?? []).filter(i => !!i.indirizzo).map(i => (
            <UserControls.Col xs={24} key={i.id}>
                <TouchableRow onClick={() => alert('deciding what to do')}>
                    <UserControls.Typography.Text>
                        <UserControls.Space>
                            {i.indirizzo}
                            -
                            {i.provincia}
                            -
                            {i.cap}
                        </UserControls.Space>
                    </UserControls.Typography.Text>
                </TouchableRow>
            </UserControls.Col>
        ))}

        <SectionHeader title="Reacapiti" links={[]} />
        {(unoAnagrafica?.aAnagraficaRecapitis ?? []).filter(r => !!r.recapito).map(r => (
            <UserControls.Col xs={24} key={r.id}>
                <TouchableRow onClick={() => alert('deciding what to do')}>
                    <UserControls.Typography.Text>
                        <UserControls.Space>
                            {r.recapito}
                        </UserControls.Space>
                    </UserControls.Typography.Text>
                </TouchableRow>
            </UserControls.Col>
        ))}

        <SectionHeader title="Cure" links={[]} />

        <UserControls.Col xs={24}>
            {cures.map(cureRiga => (
                <TouchableRow key={cureRiga.id} onClick={() => alert('deciding what to do')}>
                    <UserControls.Typography.Text>
                        <UserControls.Space>
                            {formatUtils.formatDate(cureRiga.dataEsecuzione) ?? 'no date'}
                            {cureRiga.dePrestazione}
                            {cureRiga.descrizioneEnte}
                        </UserControls.Space>
                    </UserControls.Typography.Text>
                </TouchableRow>
            ))}
        </UserControls.Col>

        <SectionHeader title="Annotazioni" links={[]} />
        {(unoAnagrafica?.mDiarioAnnotazionis ?? []).sort(new Sorter('data').sortDateDesc).map(ann => (
            <UserControls.Col xs={24} key={ann.id}>

                <TouchableRow onClick={() => alert('deciding what to do')}>
                    <UserControls.Typography.Text>
                        <UserControls.Space>
                            {formatUtils.formatDate(ann.data) ?? 'no date'}
                            {ann.note}
                        </UserControls.Space>
                    </UserControls.Typography.Text>
                </TouchableRow>

            </UserControls.Col>
        ))}

        <SectionHeader title="Impegni" links={[]} />
        {(unoAnagrafica?.agImpegnis ?? []).sort(new Sorter('dataOra').sortDateDesc).map(imp => (
            <UserControls.Col xs={24} key={imp.id}>
                <TouchableRow onClick={() => alert('deciding what to do')}>
                    <UserControls.Col xs={24}>
                        <UserControls.Typography.Text>{formatUtils.formatDateTime(imp.dataOra)}</UserControls.Typography.Text>
                        <UserControls.Typography.Text> - </UserControls.Typography.Text>
                        <UserControls.Typography.Text>{imp.deImpegno ?? ' no desc '}</UserControls.Typography.Text>
                    </UserControls.Col>
                </TouchableRow>
            </UserControls.Col>
        ))}

        <UserControls.Collapse items={[{
            key: 1,
            label: 'JSON Content',
            children: <pre>
                {JSON.stringify(unoAnagrafica, null, 4)}
            </pre>

        }]} />
    </>
}