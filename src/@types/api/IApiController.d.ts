type NextApiRequest = import('next').NextApiRequest
type NextApiResponse = import('next').NextApiResponse

type IApiController = {
    /**
     *
     */
    req: NextApiRequest | undefined,
    res: NextApiResponse | undefined
    POST?: () => void,
    GET?: () => void,
    DELETE?: () => void,
    PUT?: () => void,
    PATCH?: () => void,
}