class ACC_STATUS {
    "0" = "AC_OFF"
    "1" = "AC_REPLAY"
    "2" = "AC_LIVE"
    "3" = "AC_PAUSE"
}

class ACC_SESSION_TYPE {
    "-1" = "AC_UNKNOWN"
    "0" = "AC_PRACTICE"
    "1" = "AC_QUALIFY"
    "2" = "AC_RACE"
    "3" = "AC_HOTLAP"
    "4" = "AC_TIME_ATTACK"
    "5" = "AC_DRIFT"
    "6" = "AC_DRAG"
    "7" = "AC_HOTSTINT"
    "8" = "AC_HOTLAPSUPERPOLE"
}

class ACC_FLAG_TYPE {
    "0" = "AC_NO_FLAG"
    "1" = "AC_BLUE_FLAG"
    "2" = "AC_YELLOW_FLAG"
    "3" = "AC_BLACK_FLAG"
    "4" = "AC_WHITE_FLAG"
    "5" = "AC_CHECKERED_FLAG"
    "6" = "AC_PENALTY_FLAG"
    "7" = "ACC_GREEN_FLAG"
    "8" = "ACC_ORANGE_FLAG"
}

class ACC_PENALTY_TYPE {
    "0" = "None"
    "1" = "DriveThrough_Cutting"
    "2" = "StopAndGo_10_Cutting"
    "3" = "StopAndGo_20_Cutting"
    "4" = "StopAndGo_30_Cutting"
    "5" = "Disqualified_Cutting"
    "6" = "RemoveBestLaptime_Cutting"

    "7" = "DriveThrough_PitSpeeding"
    "8" = "StopAndGo_10_PitSpeeding"
    "9" = "StopAndGo_20_PitSpeeding"
    "10" = "StopAndGo_30_PitSpeeding"
    "11" = "Disqualified_PitSpeeding"
    "12" = "RemoveBestLaptime_PitSpeeding"

    "13" = "Disqualified_IgnoredMandatoryPit"

    "14" = "PostRaceTime"
    "15" = "Disqualified_Trolling"
    "16" = "Disqualified_PitEntry"
    "17" = "Disqualified_PitExit"
    "18" = "Disqualified_WrongWay"

    "19" = "DriveThrough_IgnoredDriverStint"
    "20" = "Disqualified_IgnoredDriverStint"

    "21" = "Disqualified_ExceededDriverStintLimit"
}

class ACC_TRACK_GRIP_STATUS {
    "0" = "ACC_GREEN"
    "1" = "ACC_FAST"
    "2" = "ACC_OPTIMUM"
    "3" = "ACC_GREASY"
    "4" = "ACC_DAMP"
    "5" = "ACC_WET"
    "6" = "ACC_FLOODED"
}

class ACC_RAIN_INTENSITY {
    "0" = "ACC_NO_RAIN"
    "1" = "ACC_DRIZZLE"
    "2" = "ACC_LIGHT_RAIN"
    "3" = "ACC_MEDIUM_RAIN"
    "4" = "ACC_HEAVY_RAIN"
    "5" = "ACC_THUNDERSTORM"
}

class ACC_WHEELS_TYPE {
    "0" = "ACC_FrontLeft"
    "1" = "ACC_FrontRight"
    "2" = "ACC_RearLeft"
    "3" = "ACC_RearRight"
}

module.exports = {
    ACC_STATUS,
    ACC_SESSION_TYPE,
    ACC_FLAG_TYPE,
    ACC_PENALTY_TYPE,
    ACC_TRACK_GRIP_STATUS,
    ACC_RAIN_INTENSITY,
    ACC_WHEELS_TYPE
}