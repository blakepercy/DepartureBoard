package com.blake.railway.passenger.departureboard.model;

import com.thalesgroup.rtti._2013_11_28.token.types.AccessToken;
import com.thalesgroup.rtti._2017_10_01.ldb.GetBoardRequestParams;
import com.thalesgroup.rtti._2017_10_01.ldb.LDBServiceSoap;
import com.thalesgroup.rtti._2017_10_01.ldb.Ldb;
import com.thalesgroup.rtti._2017_10_01.ldb.StationBoardResponseType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class LdbService
{
    private LDBServiceSoap ldbService;
    private GetBoardRequestParams getBoardRequestParams;
    private AccessToken accessToken;
    private int numberOfRows;
    private String crs;

    public LdbService(
        @Value("${departure.board.crs:MTB}") String crs,
        @Value("${departure.board.number.of.rows:5}") int rows,
        @Value("${national.rail.enquiries.access.token}") String accessToken
                     )
    {
        this.crs = crs;
        this.numberOfRows = rows;
        this.accessToken = new AccessToken();
        this.accessToken.setTokenValue(accessToken);
        Ldb ldb = new Ldb();
        HeaderHandlerResolver headerHandlerResolver = new HeaderHandlerResolver(this.accessToken);
        ldb.setHandlerResolver(headerHandlerResolver);
        this.ldbService = ldb.getLDBServiceSoap();

        this.getBoardRequestParams = new GetBoardRequestParams();
        this.getBoardRequestParams.setCrs(this.crs);
        this.getBoardRequestParams.setNumRows(numberOfRows);
    }

    public void setNumberOfRows(int numberOfRows)
    {
        this.numberOfRows = numberOfRows;
    }

    public StationBoardResponseType getDepartureBoard()
    {
        return ldbService.getDepartureBoard(getBoardRequestParams);
    }

    public StationBoardResponseType getDepartureBoard(final String crs) {
        this.getBoardRequestParams.setCrs(crs);
        return ldbService.getDepartureBoard(getBoardRequestParams);
    }




}
