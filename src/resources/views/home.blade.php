@extends('layouts.app')

@section('content')
<div class="row flex-column justify-content-center">
    <div id="app"></div>
</div>
@endsection

@section('script')
<script src="{{ asset('js/main.js') }}"></script>
@endsection