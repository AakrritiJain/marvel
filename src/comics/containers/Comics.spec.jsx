import React from "react";
import * as ReactQuery from 'react-query';
import {fireEvent, render} from "@testing-library/react";
import {when} from "jest-when";
import {Comics} from "./Comics";

const mockCharacters1 = [
    ...new Array(8).fill("").map((x, idx) => `Spider Man ${idx}`),
];
const mockCharacters2 = [
    ...new Array(8).fill("").map((x, idx) => `Ant-Man ${idx}`),
];

const mockData1 = {
    data: {
        results: mockCharacters1.map((character, idx) => {
            return {
                id: idx,
                title: `The Ultimates of ${character}`,
                issueNumber: idx,
                thumbnail: {
                    extension: "png",
                    path: "/pathToImage"
                }
            }
        }),
        total: 16,
    }
}

const mockData2 = {
    data: {
        results: mockCharacters2.map((character, idx) => {
            return {
                id: idx,
                title: `The Ultimates of ${character}`,
                issueNumber: idx,
                thumbnail: {
                    extension: "png",
                    path: "/pathToImage"
                }
            }
        }),
        total: 16,
    }
}

describe("Comics", () => {
    it("should be listed with pagination", async () => {
        const useQueryMock = jest.spyOn(ReactQuery, 'useQuery').mockImplementation(() => ({
            data: {},
            isLoading: false,
            error: false
        }));
        when(useQueryMock).calledWith("comics", expect.anything())
            .mockImplementationOnce(() => ({
                data: mockData1,
                isLoading: false,
                error: false
            }))
            .mockImplementationOnce(() => ({data: mockData2, isLoading: false, error: false}));

        const {getByRole, getAllByRole} = render(<Comics/>);

        // first page should should all spider man comics
        const allSpiderManImage = await getAllByRole("img", {name: /^The Ultimates of Spider Man/});
        expect(allSpiderManImage).toHaveLength(8);

        // go to next page
        const nextButton = getByRole("button", {name: "next"});
        fireEvent.click(nextButton);

        // next page should should all ant man comics
        const allAntManImage = await getAllByRole("img", {name: /^The Ultimates of Ant-Man/});
        expect(allAntManImage).toHaveLength(8);
    });
});