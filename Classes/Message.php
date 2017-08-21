<?php
/**
 * Created by PhpStorm.
 * User: isidoris-simplon
 * Date: 28/07/17
 * Time: 10:54
 */

class message
{
    private $user;
    private $message;
    private $date;

    /**
     * message constructor.
     * @param $user
     * @param $message
     */
    public function __construct($user, $message, $date)
    {
        $this->user = $user;
        $this->message = $message;
        $this->date = $date;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }


}