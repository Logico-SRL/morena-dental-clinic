type IPubMedSearchResultResponse = {
    header: IPubMedResultHeader,
    esearchresult: IPubMedSearchResult
}

type IPubMedSummaryResultResponse = {
    header?: IPubMedResultHeader,
    result: IPubMedSummaryResult
}

type IPubMedDetailResultResponse = any;
// {
//     header: IPubMedResultHeader,
//     result: IPubMedDetailResult
// }

type IPubMedResponse = {
    search: IPubMedSearchResult
} & {
    summary: IPubMedSummaryResult
};

type IPubMedResultHeader = {
    type: string,
    version: string
}

type IPubMedSearchResult = {
    count: string,
    retmax: string,
    retstart: string,
    idlist: string[],
    translationset: {
        from: string,
        to: string
    }[],
    translationstack: ({ term: string, field: string, count: string, explode: string } | string)[],
    querytranslation: string
}

type IPubMedSummaryResult = {
    uids: string[],
    [key: string]: IPubMedSummary
}

type IPubMedDetail = {
    PubmedArticleSet: {
        PubmedArticle: {
            MedlineCitation: {
                PMID: { _text: '10476565' }
                _attributes: {
                    Status: string,
                    Owner: string
                },
                DateCompleted: {
                    Year: {
                        _text: string
                    },
                    Month: {
                        _text: string
                    },
                    Day: {
                        _text: string
                    }
                },
                DateRevised: {
                    Year: {
                        _text: string
                    },
                    Month: {
                        _text: string
                    },
                    Day: {
                        _text: string
                    }
                },
                Article: {
                    Journal: {
                        ISSN: {
                            _attributes: {
                                IssnType: string
                            },
                            _text: string
                        },
                        JournalIssue: {
                            _attributes: {
                                CitedMedium: string
                            },
                            Volume: {
                                _text: string
                            },
                            Issue: {
                                _text: string
                            },
                            PubDate: {
                                Year: {
                                    _text: string
                                },
                                Month: {
                                    _text: string
                                }
                            }
                        },
                        Title: {
                            _text: string
                        },
                        ISOAbbreviation: {
                            _text: string
                        }
                    },
                    ArticleTitle: {
                        _text: string
                    },
                    Pagination: any,
                    Abstract?: {
                        AbstractText: {
                            _text: string
                        }
                    },
                    AuthorList: {
                        Author: {
                            _attributes: {
                                ValidYN: string
                            },
                            LastName: {
                                _text: string
                            },
                            ForeName: {
                                _text: string
                            },
                            Initials: {
                                _text: string
                            },
                            AffiliationInfo: {
                                Affiliation: {
                                    _text: string
                                }
                            }
                        }[] | {
                            _attributes: {
                                ValidYN: string
                            },
                            LastName: {
                                _text: string
                            },
                            ForeName: {
                                _text: string
                            },
                            Initials: {
                                _text: string
                            },
                            AffiliationInfo: {
                                Affiliation: {
                                    _text: string
                                }
                            }
                        }
                    },
                    Language: {
                        _text: string
                    },
                    PublicationTypeList: {
                        PublicationType: {
                            _attributes: {
                                UI: string
                            },
                            _text: string
                        }[]
                    }
                },
                MedlineJournalInfo: {
                    Country: {
                        _text: string
                    },
                    MedlineTA: {
                        _text: string
                    },
                    NlmUniqueID: {
                        _text: 0425076
                    },
                    ISSNLinking: {
                        _text: string
                    }
                },
                ChemicalList: {
                    Chemical: {
                        RegistryNumber: {
                            _text: 0
                        },
                        NameOfSubstance: {
                            _attributes: {
                                UI: string
                            },
                            _text: string
                        }
                    }
                },
                CitationSubset: {
                    _text: string
                },
                MeshHeadingList: {
                    MeshHeading: {
                        DescriptorName: {
                            _attributes: {
                                UI: string,
                                MajorTopicYN: string
                            },
                            _text: string
                        },
                        QualifierName: {
                            _attributes: {
                                UI: string,
                                MajorTopicYN: string
                            },
                            _text: string
                        }
                    }[]
                }
            },
            PubmedData: {
                History: {
                    PubMedPubDate: [{
                        _attributes: {
                            PubStatus: string
                        },
                        Year: {
                            _text: string
                        },
                        Month: {
                            _text: string
                        },
                        Day: {
                            _text: string
                        }
                    }, {
                        _attributes: {
                            PubStatus: string
                        },
                        Year: {
                            _text: string
                        },
                        Month: {
                            _text: string
                        },
                        Day: {
                            _text: string
                        },
                        Hour: {
                            _text: string
                        },
                        Minute: {
                            _text: string
                        }
                    }, {
                        _attributes: {
                            PubStatus: string
                        },
                        Year: {
                            _text: string
                        },
                        Month: {
                            _text: string
                        },
                        Day: {
                            _text: string
                        },
                        Hour: {
                            _text: string
                        },
                        Minute: {
                            _text: string
                        }
                    }
                    ]
                },
                PublicationStatus: {
                    _text: string
                },
                ArticleIdList: {
                    ArticleId: {
                        _attributes: {
                            IdType: string
                        },
                        _text: string
                    }
                    []
                }
            }
        }
    }
}

type IPubMedSummary = {
    uid: string,
    pubdate: string,
    epubdate: string,
    source: string,
    authors: {
        name: string,
        authtype: string,
        clusterid: string
    }[],
    lastauthor: string,
    title: string,
    sorttitle: string,
    volume: string,
    issue: string,
    pages: string,
    lang: string[],
    nlmuniqueid: string,
    issn: string,
    essn: string,
    pubtype: string[],
    recordstatus: string,
    pubstatus: string,
    articleids: {
        idtype: string,
        idtypen: number,
        value: string
    }[],
    history: {
        pubstatus: string,
        date: string
    }[],
    references: unknown[],
    attributes: unknown[],
    pmcrefcount: string,
    fulljournalname: string,
    elocationid: string,
    doctype: string,
    srccontriblist: unknown[],
    booktitle: string,
    medium: string,
    edition: string,
    publisherlocation: string,
    publishername: string,
    srcdate: string,
    reportnumber: string,
    availablefromurl: string,
    locationlabel: string,
    doccontriblist: unknown[],
    docdate: string,
    bookname: string,
    chapter: string,
    sortpubdate: string,
    sortfirstauthor: string,
    vernaculartitle: string
}